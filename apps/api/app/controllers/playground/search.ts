import { Request, Response } from 'express';
import { playground as Playground } from '../../models/index.js';

export async function search(req: Request, res: Response) {
  const { search } = req.query;
  // Need to asseer query
  const playgrounds = await Playground.search(search as string);
  if (!playgrounds) {
    return res.status(204).json({ message: 'playgrounds not found' });
  }
  return res.status(200).json(playgrounds);
}
