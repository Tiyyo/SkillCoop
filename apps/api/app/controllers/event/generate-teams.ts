import { Request, Response } from 'express';
import deleteDecodedKey from '../../utils/delete-decoded.js';
import NotFoundError from '../../helpers/errors/not-found.error.js';
import { generateBalancedTeam } from '../../services/generate-teams/index.js';
import checkParams from '../../utils/check-params.js';

export async function generateTeams(req: Request, res: Response) {
  deleteDecodedKey(req.body);
  const [eventId] = checkParams(req.body.eventId);

  if (!eventId)
    throw new NotFoundError('No event id found', 'generateTeams controller');

  await generateBalancedTeam(eventId);
  res.status(200).json({
    success: true,
  });
}
