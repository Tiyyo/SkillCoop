import { Request, Response } from 'express';
import { event as Event } from '../../models/index.js';

import checkParams from '../../utils/check-params.js';
// Migrated
export async function getOne(req: Request, res: Response) {
  const [eventId, profileId] = checkParams(
    req.params.eventId,
    req.params.profileId,
  );
  const event = await Event.getEventById(eventId, profileId);
  res.status(200).json(event);
}
