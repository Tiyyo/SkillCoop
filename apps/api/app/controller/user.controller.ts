import { Request, Response } from 'express';
import { profile as Profile } from '../models/index.js';
import { image as Image } from '../models/index.js';
import { user as User } from '../models/index.js';
import bcrypt from 'bcrypt';
import checkParams from '../utils/check-params.js';
import AuthorizationError from '../helpers/errors/unauthorized.error.js';
import NotFoundError from '../helpers/errors/not-found.error.js';
import { UserInfosToken } from '@skillcoop/types';

export default {
  getMe: async (req: Request, res: Response) => {
    const { decoded } = req.body;
    const { user_id } = decoded as UserInfosToken;
    const userProfile = await Profile.find(user_id);
    res
      .status(200)
      .json({ userProfile, success: !!userProfile, userId: user_id });
  },
  updateEmail: async (req: Request, res: Response) => {
    const { email, user_id } = req.body;

    const isUpdated = await User.updateOne({ id: user_id }, { email });
    res
      .status(200)
      .json({ success: isUpdated, new_email: isUpdated ? email : null });
  },
  updatePassword: async (req: Request, res: Response) => {
    const { old_password, new_password, user_id } = req.body;
    const user = await User.findOne({ id: user_id });

    if (!user) throw new NotFoundError('User not found');

    // check if old password match
    // create a new hash password
    // update the user with the new hash password

    const isMatch = await bcrypt.compare(old_password, user.password);
    if (!isMatch) throw new Error('Password do not match');

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(new_password, saltRounds);

    const isUpdate = await User.updateOne(
      { id: user_id },
      { password: hashedPassword },
    );

    res.status(200).json({ success: isUpdate });
  },
  deleteUser: async (req: Request, res: Response) => {
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

    res.status(204).end();
  },
};
