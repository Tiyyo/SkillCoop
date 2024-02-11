import { Request, Response } from 'express';
import { UserInfosToken } from '@skillcoop/types';
import { profile as Profile } from '../../models/index.js';

export async function getMe(req: Request, res: Response) {
  const { decoded } = req.body;
  const { user_id } = decoded as UserInfosToken;
  const userProfile = await Profile.find(user_id);
  res
    .status(200)
    .json({ userProfile, success: !!userProfile, userId: user_id });
}
