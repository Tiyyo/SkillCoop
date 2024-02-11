import { Request, Response } from 'express';
import deleteDecodedKey from '../../utils/delete-decoded.js';
import UserInputError from '../../helpers/errors/user-input.error.js';
import {
  event as Event,
  profileOnEvent as ProfileOnEvent,
} from '../../models/index.js';
/*eslint-disable max-len*/
import { ParticipantStatusManager } from '../../services/participant.service.js';
/*eslint-enable max-len*/

export async function updateStatus(req: Request, res: Response) {
  deleteDecodedKey(req.body);

  const { profile_id, event_id, status_name } = req.body;

  const data = { profile_id, event_id, status_name, updated_at: undefined };
  const event = await Event.findOne({ id: data.event_id });
  if (!event) throw new UserInputError('Event not found');

  const userMessage = await new ParticipantStatusManager(
    ProfileOnEvent,
    event,
    status_name,
    profile_id,
  ).manage();

  res.status(200).json(userMessage);
}
