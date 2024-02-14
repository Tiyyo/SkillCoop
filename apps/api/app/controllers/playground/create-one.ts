import { Request, Response } from 'express';
import { playground as Playground } from '../../models/index.js';

export async function createOne(req: Request, res: Response) {
  const {
    name,
    address,
    post_code,
    city,
    region,
    country,
    longitude,
    latitude,
  } = req.body;

  const isCreated = await Playground.createOne({
    name,
    address,
    post_code,
    city,
    region,
    country,
    longitude,
    latitude,
  });
  if (!isCreated) {
    return res.status(400).json({ error: 'playground not created' });
  }
  return res.status(200).json({ message: 'Playground created successfully' });
}
