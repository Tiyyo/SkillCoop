import { Request, Response } from 'express';
import {
  event as Event,
  profileOnEvent as ProfileOnEvent,
} from '../../models/index.js';
/*eslint-disable*/
import { notifyUserHasBeenInvitedToEvent } from '../../services/notification/subtype/user-invited-event.js';
/*eslint-enable*/
import deleteDecodedKey from '../../utils/delete-decoded.js';
import ServerError from '../../helpers/errors/server.error.js';
import { eventQueuePublisher } from '../../publishers/event.publisher.js';
//Migrated
export async function createOne(req: Request, res: Response) {
  // create one event
  // add organizer to the event
  // add organizer to the participant list
  deleteDecodedKey(req.body);
  const { participants: ids, ...data } = req.body;

  const event = await Event.create({
    organizer_id: data.organizer_id,
    status_name: 'open',
    date: data.date,
    duration: data.duration,
    location_id: data.location_id,
    required_participants: data.required_participants,
    visibility: data.visibility,
    price: data.price,
  });
  if (!event)
    throw new ServerError(
      'Failed to create event',
      'createOne Event Controller',
    );

  await ProfileOnEvent.createOne({
    event_id: event.id,
    profile_id: data.organizer_id,
    status_name: 'confirmed',
  });

  if (ids) {
    const participantsToInvite = ids.map((id: number) => {
      return {
        profile_id: id,
        event_id: event.id,
        status_name: 'pending',
      };
    });
    await ProfileOnEvent.createMany(participantsToInvite);

    // send notification to invited users here
    notifyUserHasBeenInvitedToEvent(event.id, data.organizer_id, ids);
  }

  // sync chat service database
  // TODO: implement sync chat service
  let allParticipantsIds;
  if (ids && ids.length > 0) {
    ids.push(data.organizer_id);
    allParticipantsIds = ids;
  } else {
    data.organizer_id;
    allParticipantsIds = [data.organizer_id];
  }

  await eventQueuePublisher({
    organizer_id: data.organizer_id,
    event_id: event.id,
    participants_id: allParticipantsIds,
    action: 'create_event',
  });

  res.status(201).json({
    success: true,
  });
}
