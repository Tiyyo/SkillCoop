import { Request, Response } from 'express';
import { eventStatus } from '@skillcoop/types';
import deleteDecodedKey from '../../utils/delete-decoded.js';
import { score as Score, event as Event } from '../../models/index.js';

export async function createOne(req: Request, res: Response) {
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
}
