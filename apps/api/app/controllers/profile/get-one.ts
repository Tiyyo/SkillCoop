import { Request, Response } from 'express';
import checkParams from '../../utils/check-params.js';
import { profile as Profile } from '../../models/index.js';

export async function getOne(req: Request, res: Response) {
  const [profileId] = checkParams(req.params.profileId);
  const profile = await Profile.find(profileId);

  return res.status(200).json(profile);
}
