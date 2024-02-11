import { Request, Response } from 'express';
import { profile as Profile } from '../../models/index.js';

export async function updateOne(req: Request, res: Response) {
  const { profile_id, ...data } = req.body.data;
  const isUpdate = await Profile.updateSyncChat(
    { profile_id: profile_id },
    data,
  );

  return res.status(204).send({ success: isUpdate });
}
