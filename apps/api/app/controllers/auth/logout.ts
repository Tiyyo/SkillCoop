import { Request, Response } from 'express';

export async function logout(_req: Request, res: Response) {
  res.clearCookie('refreshToken', { sameSite: 'none', secure: true });

  // NEED TO SEND SOMETHING WITH STATUS IF NOT COOKIE IS NOT CLEAR
  res.status(204).end();
}
