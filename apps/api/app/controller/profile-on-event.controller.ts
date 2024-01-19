import UserInputError from '../helpers/errors/user-input.error.js';
import { profileOnEvent as ProfileOnEvent } from '../models/index.js';
import { event as Event } from '../models/index.js';
import { Request, Response } from 'express';
import deleteDecodedKey from '../utils/delete-decoded.js';
/*eslint-disable*/
import { notifyUserHasBeenInvitedToEvent } from '../service/notification/subtype/user-invited-event.js';
import { participantQueuePublisher } from '../publisher/participant.publisher.js';
import { ParticipantStatusManager } from '../service/participant.service.js';
/*eslint-enable*/

export default {
  // Need a refactor
  async updateStatus(req: Request, res: Response) {
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
  },
  async sendInvitationToEvent(req: Request, res: Response) {
    deleteDecodedKey(req.body);
    const { ids, event_id, initiator: profile_id } = req.body;

    const data = ids.map((id: number) => ({
      profile_id: id,
      event_id,
      status_name: 'pending',
    }));
    const isCreated = await ProfileOnEvent.createMany(data);
    // send notification for each participant invited
    notifyUserHasBeenInvitedToEvent(event_id, profile_id, ids);
    // sync database with chat service to add them in group event
    await participantQueuePublisher({
      event_id,
      action: 'add_participant',
      participants_id: ids,
    });
    res.status(201).send({ success: isCreated });
  },
};
