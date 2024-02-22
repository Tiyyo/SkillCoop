import { Request, Response } from 'express';
import { HOST } from '../../utils/variables.js';

//Migrated
export async function logout(_req: Request, res: Response) {
  res.clearCookie('refreshToken', {
    sameSite: 'none',
    secure: true,
    domain: HOST,
  });

  // NEED TO SEND SOMETHING WITH STATUS IF NOT COOKIE IS NOT CLEAR
  res.status(204).end();
}
