import { score as Score } from '../models/index';
import { event as Event } from '../models/index';
import { Request, Response } from 'express';
import deleteDecodedKey from '../utils/delete-decoded';
import { eventStatus } from 'skillcoop-types';

export default {
  async createOne(req: Request, res: Response) {
    deleteDecodedKey(req.body);
    const { score_team_1, score_team_2, event_id } = req.body;

    await Score.createOne({
      score_team_1,
      score_team_2,
      event_id,
    });
    const isUpdate = await Event.updateOne(
      { id: event_id },
      {
        status_name: eventStatus.completed,
      },
    );

    res.status(201).json({ success: isUpdate });
  },
};
