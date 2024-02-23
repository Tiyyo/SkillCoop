import { Request, Response } from 'express';
import deleteDecodedKey from '../../utils/delete-decoded.js';
import { profileOnEvent as ProfileOnEvent } from '../../models/index.js';
//Migrated
export async function useSendRequestToJoinEvent(req: Request, res: Response) {
  deleteDecodedKey(req.body);
  const { event_id, profile_id } = req.body;

  const isCreated = await ProfileOnEvent.upsert({
    status_name: 'requested',
    event_id,
    profile_id,
  });
  // send notification for each participant invited
  //TODO: implements notifyNewEventPatricipantToOrganizer

  res.status(201).send({ success: isCreated });
}
