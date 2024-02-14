import { Request, Response } from 'express';
import { profileOnProfile as ProfileOnProfile } from '../../models/index.js';
import UserInputError from '../../helpers/errors/user-input.error.js';

export async function searchFriends(req: Request, res: Response) {
  const { username, profile, page } = req.query;
  if (!username || typeof username !== 'string')
    throw new UserInputError('Username is not a string or is undefined');
  const friends = await ProfileOnProfile.findFriendByUsernameInUserFriendlist(
    Number(profile),
    username,
    Number(page),
  );

  res.status(200).json(friends);
}
