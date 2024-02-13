import { Request, Response } from 'express';
import checkParams from '../../utils/check-params.js';
import { profile as Profile } from '../../models/index.js';
import UserInputError from '../../helpers/errors/user-input.error.js';

export async function searchProfileByUsername(req: Request, res: Response) {
  const { username } = req.query;
  // Reminder: checkParams can also be use to convert string to number
  const [userProfileId, page] = checkParams(
    req.query.userProfileId,
    req.query.page,
  );

  if (typeof username !== 'string')
    throw new UserInputError('Username must be a string');

  const profiles = await Profile.searchByUsername(
    username,
    userProfileId,
    page,
  );

  if (!profiles || profiles.length === 0) {
    return res.status(200).json(null);
  }
  return res.status(200).json(profiles);
}
