import { Request, Response } from 'express';
import {
  event as Event,
  profileOnEvent as ProfileOnEvent,
} from '../../models/index.js';
/*eslint-disable*/
import { notifyEventInfosHasBeenUpdated } from '../../services/notification/subtype/infos-event.js';
import { EventStatusAdjusterService } from '../../services/event/event-status-adjuster.js';
/*eslint-enable*/
import { invitationStatus } from '@skillcoop/types';
import deleteDecodedKey from '../../utils/delete-decoded.js';
import ForbidenError from '../../helpers/errors/forbiden.js';

const possibleFieldsUpdated = [
  'date',
  'duration',
  'location',
  'required_participants',
  'status_name',
  'visibility',
  'price',
];

export type UpdateEventData = {
  date: string;
  start_time?: string;
  start_date?: string;
  duration: number;
  location: string;
  required_participants: number;
  organizer_id: number;
  status_name: 'open';
  participants?: number[];
};

export async function updateOne(req: Request, res: Response) {
  // update one event
  // only the organize can update the event
  deleteDecodedKey(req.body);
  const { event_id, profile_id, ...data } = req.body;
  const event = await Event.findOne({ id: event_id });
  const confirmedParticipants = await ProfileOnEvent.find({
    event_id,
    status_name: invitationStatus.confirmed,
  });

  if (!event || event.organizer_id !== profile_id)
    throw new ForbidenError(
      'Operation not allowed : you are not the organizer',
      'Operation not allowed',
      'event.controller updateOne',
      '63',
    );

  const dataHasChange = possibleFieldsUpdated.some((field) => {
    return data[field] !== event[field as keyof typeof event];
  });

  if (!dataHasChange)
    return res.status(201).json({
      message: 'Nothing to update',
    });

  const eventAdjuster = new EventStatusAdjusterService(
    data,
    event,
    confirmedParticipants,
  );
  const adjustedUpdateData = eventAdjuster.data;

  const isUpdated = await Event.updateOne({ id: event_id }, adjustedUpdateData);

  notifyEventInfosHasBeenUpdated(event_id);

  res.status(204).json({
    success: isUpdated,
  });
}
