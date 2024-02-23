import { Request, Response } from 'express';
import deleteDecodedKey from '../../utils/delete-decoded.js';
import { profileOnEvent as ProfileOnEvent } from '../../models/index.js';
/*eslint-disable max-len*/
import { participantQueuePublisher } from '../../publishers/participant.publisher.js';
import { notifyUserHasBeenInvitedToEvent } from '../../services/notification/subtype/user-invited-event.js';
/*eslint-enable max-len*/

//Migrated
export async function sendInvitationToEvent(req: Request, res: Response) {
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
}
