import { Request, Response } from 'express';
import { event as Event } from '../../models/index.js';
import checkParams from '../../utils/check-params.js';

export async function getAllByUser(req: Request, res: Response) {
  const [profileId] = checkParams(req.params.profileId);
  const events = await Event.getEventByUserId(profileId);

  res.status(200).json(events);
}
