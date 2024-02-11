import { Request, Response } from 'express';
import checkParams from '../../utils/check-params.js';
import { friendslist as Friendlist } from '../../models/index.js';

export async function getSuggestProfile(req: Request, res: Response) {
  const [profileId] = checkParams(req.params.profileId);
  const suggestProfiles = await Friendlist.findSuggestProfile(profileId);

  res.status(200).json(suggestProfiles);
}
