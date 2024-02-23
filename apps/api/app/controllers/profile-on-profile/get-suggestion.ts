import { Request, Response } from 'express';
import checkParams from '../../utils/check-params.js';
import { profileOnProfile as ProfileOnProfile } from '../../models/index.js';
//Migrated
export async function getSuggestProfile(req: Request, res: Response) {
  const [profileId] = checkParams(req.params.profileId);
  const suggestProfiles = await ProfileOnProfile.findSuggestProfile(profileId);

  res.status(200).json(suggestProfiles);
}
