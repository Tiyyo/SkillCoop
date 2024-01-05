import { Request, Response } from 'express';
import { profile as Profile } from '../models/index';
import { image as Image } from '../models/index';
import { user as User } from '../models/index';
import bcrypt from 'bcrypt';
import checkParams from '../utils/check-params';
import AuthorizationError from '../helpers/errors/unauthorized.error';

export default {
  getMe: async (req: Request, res: Response) => {
    const { decoded } = req.body;
    const userId = decoded.user_id;
    const userProfile = await Profile.findByUserId(userId);

    if (!userProfile) {
      await Profile.create({ user_id: userId, created_at: '' });
      const createdUserProfile = await Profile.findByUserId(userId);
      return res.status(200).json({ userProfile: createdUserProfile });
    }
    res.status(200).json({ userProfile: userProfile });
  },
  updateEmail: async (req: Request, res: Response) => {
    const { email, user_id } = req.body;

    const userProfile = await User.update(user_id, { email });

    res.status(200).json({ success: userProfile, new_email: email });
  },
  updatePassword: async (req: Request, res: Response) => {
    const { old_password, new_password, user_id } = req.body;

    const user = await User.findByPk(user_id);

    // check if old password match
    // create a new hash password
    // update the user with the new hash password

    const isMatch = await bcrypt.compare(old_password, user.password);
    if (!isMatch) throw new Error('Password do not match');

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(new_password, saltRounds);

    const isUpdate = await User.update(user_id, { password: hashedPassword });

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
    const profile = await Profile.findByUserId(userId);

    if (profile?.avatar_url) {
      await Image.deleteBy({ url: profile.avatar_url });
    }

    const isDeleted = await User.delete(userId);
    res.status(204).json({ success: isDeleted });
  },
};
