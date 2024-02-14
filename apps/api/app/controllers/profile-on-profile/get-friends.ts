import { Request, Response } from 'express';
import checkParams from '../../utils/check-params.js';
import { profileOnProfile as ProfileOnProfile } from '../../models/index.js';

export async function getFriends(req: Request, res: Response) {
  // get all friend
  const [id] = checkParams(req.params.profileId);
  const friendlist = await ProfileOnProfile.findAllByPk(id);

  res.status(200).json(friendlist);
}
