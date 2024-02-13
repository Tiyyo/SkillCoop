import { Request, Response } from 'express';
import deleteDecodedKey from '../../utils/delete-decoded.js';
import NotFoundError from '../../helpers/errors/not-found.error.js';
import { generateBalancedTeam } from '../../services/generate-teams/index.js';

export async function generateTeams(req: Request, res: Response) {
  deleteDecodedKey(req.body);
  const { eventId } = req.body;
  if (!eventId)
    throw new NotFoundError('No event id found', 'generateTeams controller');
  if (typeof eventId !== 'number')
    throw new TypeError('eventId is not a number');

  await generateBalancedTeam(eventId);
  res.status(200).json({
    success: true,
  });
}
