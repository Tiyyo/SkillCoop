import { Request, Response } from 'express';
import { event as Event } from '../../models/index.js';
import checkParams from '../../utils/check-params.js';
import NotFoundError from '../../helpers/errors/not-found.error.js';
import AuthorizationError from '../../helpers/errors/unauthorized.error.js';

export async function deleteOne(req: Request, res: Response) {
  // delete one event
  // only the organizer can delete the event
  const [eventId, profileId] = checkParams(req.params.id, req.params.profileId);

  const event = await Event.findOne({ id: eventId });

  if (!event) throw new NotFoundError('No event');
  if (event.organizer_id !== profileId)
    throw new AuthorizationError('Operation not allowed');

  const isDeleted = await Event.deleteSyncChat(eventId, profileId);

  res.status(204).json({
    success: isDeleted,
  });
}
