import { Request, Response } from 'express';
import checkParams from '../../utils/check-params.js';
import { friendslist as Friendlist } from '../../models/index.js';

export async function getRequestToAccept(req: Request, res: Response) {
  const [profileId] = checkParams(req.params.profileId);
  // get friendship where id = friend_id and status = pending
  const pendingRequests = await Friendlist.findPendingRequests(profileId);

  res.status(200).json(pendingRequests);
}
