import { Request, Response } from 'express';
import { event as Event } from '../../models/index.js';
import checkParams from '../../utils/check-params.js';

export async function getLastSharedEvents(req: Request, res: Response) {
  const [profileId, friendId] = checkParams(
    req.params.profileId,
    req.params.friendId,
  );
  const events = await Event.getLastSharedEvents(profileId, friendId);

  res.status(200).json(events);
}
