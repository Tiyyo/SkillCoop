import { mvp as Mvp } from '../models/index';
import { event as Event } from '../models/index';
import { Request, Response } from 'express';
import deleteDecodedKey from '../utils/delete-decoded';

export default {
  createOne: async (req: Request, res: Response) => {
    deleteDecodedKey(req.body);

    const { profile_id, rater_id, event_id } = req.body;
    const event = await Event.getEventById(event_id, profile_id);
    if (!event || event.status_name !== 'completed')
      throw new Error('Event not found or not completed');

    const isCreated = await Mvp.create({ profile_id, rater_id, event_id });
    // this should be not possible to called
    if (!isCreated) throw new Error('Not created');

    const isUpdated = await Event.updateMvp(event_id);

    res.status(201).json({ succces: isUpdated });
  },
};
