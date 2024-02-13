import { Request, Response } from 'express';
import { event as Event, mvp as Mvp } from '../../models/index.js';
import deleteDecodedKey from '../../utils/delete-decoded.js';

export async function createOne(req: Request, res: Response) {
  deleteDecodedKey(req.body);

  const { profile_id, rater_id, event_id } = req.body;
  const event = await Event.getEventById(event_id, profile_id);
  if (!event || event.status_name !== 'completed')
    throw new Error('Event not found or not completed');

  const isCreated = await Mvp.createOne({
    profile_id,
    rater_id,
    event_id,
  });
  // this should be not possible to called
  if (!isCreated) throw new Error('Not created');

  const isUpdated = await Event.updateMvp(event_id);

  res.status(201).json({ succces: isUpdated });
}