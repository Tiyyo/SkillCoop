import { Request, Response } from 'express';
import checkParams from '../../utils/check-params.js';
import { profileOnProfile as ProfileOnProfile } from '../../models/index.js';

//Migrated
export async function getRequestToAccept(req: Request, res: Response) {
  const [profileId] = checkParams(req.params.profileId);
  // get friendship where id = friend_id and status = pending
  const pendingRequests = await ProfileOnProfile.findPendingRequests(profileId);

  res.status(200).json(pendingRequests);
}
