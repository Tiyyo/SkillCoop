import { Request, Response } from 'express';
import { event as Event } from '../../models/index.js';
import checkParams from '../../utils/check-params.js';

export async function getUpcoming(req: Request, res: Response) {
  const [profileId, page] = checkParams(req.query.profileId, req.query.page);
  const events = await Event.getUpcomingEvents(profileId, page);

  res.status(200).json(events);
}
