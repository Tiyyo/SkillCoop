import { bestStriker as BestStriker, event as Event } from '#models';
import { Request, Response } from 'express';
import deleteDecodedKey from '#utils/delete-decoded';
import NotFoundError from '#errors/not-found.error';

export default {
  createOne: async (req: Request, res: Response) => {
    deleteDecodedKey(req.body);

    const { profile_id, rater_id, event_id } = req.body;
    const event = await Event.getEventById(event_id, profile_id);
    if (!event || event.status_name !== 'completed')
      throw new NotFoundError(
        'Event not found or status not equal to completed',
        'best-striker.controller createOne',
        '14',
      );

    const isCreated = await BestStriker.createOne({
      event_id,
      profile_id,
      rater_id,
    });

    // this should be not possible to called
    if (!isCreated) throw new Error('Not created');

    const isUpdated = await Event.updateBestStriker(event_id);
    res.status(201).json({ success: isUpdated });
  },
};
