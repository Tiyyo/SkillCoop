import { Request, Response } from 'express';
import { profile as Profile } from '../../models/index.js';

export async function createOne(req: Request, res: Response) {
  const data = req.body;
  const result = await Profile.createOne(data);

  return res.status(201).json({ success: !!result });
}
