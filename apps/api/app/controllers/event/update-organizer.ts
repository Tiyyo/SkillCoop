import { Request, Response } from 'express';
import { event as Event } from '../../models/index.js';
/*eslint-disable*/
import { notifyTransfertOwnership } from '../../services/notification/subtype/transfert-ownership.js';
/*eslint-enable*/
import deleteDecodedKey from '../../utils/delete-decoded.js';
import ForbidenError from '../../helpers/errors/forbiden.js';

export async function updateOrganizer(req: Request, res: Response) {
  deleteDecodedKey(req.body);
  const { event_id, organizer_id, new_organizer_id } = req.body;

  const event = await Event.findOne({ id: event_id });

  if (!event || event.organizer_id !== organizer_id)
    throw new ForbidenError(
      'Operation not allowed : you are not the organizer',
      'Operation not allowed',
      'event.controller updateOne',
      '63',
    );

  const isUpdated = await Event.updateOne(
    { id: event_id },
    {
      organizer_id: new_organizer_id,
    },
  );

  if (isUpdated) {
    await notifyTransfertOwnership(event_id, organizer_id, new_organizer_id);
  }

  res.status(200).json({
    success: isUpdated,
  });
}
