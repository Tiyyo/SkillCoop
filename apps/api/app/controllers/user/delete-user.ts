import { Request, Response } from 'express';
import {
  profile as Profile,
  user as User,
  image as Image,
} from '../../models/index.js';
import checkParams from '../../utils/check-params.js';
import AuthorizationError from '../../helpers/errors/unauthorized.error.js';
import { userQueuePublisher } from '../../publishers/user.publisher.js';

export async function deleteUser(req: Request, res: Response) {
  const [userId] = checkParams(req.params.userId);
  const tokenUserId = req.body.decoded.user_id;

  if (userId !== tokenUserId) {
    // Just to be annoying and invalidate all tokens and forced user to logout
    res.clearCookie('refreshToken');
    throw new AuthorizationError('Operation not allowed');
  }
  const profile = await Profile.find(userId);

  if (profile?.avatar_url) {
    await Image.deleteOne({ url: profile.avatar_url });
  }

  const isDeleted = await User.deleteOne({ id: userId });
  if (!isDeleted) {
    res.status(400).json({ error: 'Could not delete this account' });
  }

  await userQueuePublisher({ profile_id: userId, action: 'delete' });

  res.status(204).end();
}
