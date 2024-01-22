import { Request, Response } from 'express';
import authService from '#services/auth/auth';
import logger from '#helpers/logger';

export async function signin(req: Request, res: Response) {
  const { email, password } = req.body;
  const MAX_AGE = 1000 * 60 * 60 * 24 * 7; // 7 days

  try {
    const loginTrack = await authService.login({
      email,
      password,
    });
    if (!loginTrack.success) {
      return res.status(loginTrack.status).json({
        error: loginTrack.error,
        blocked: loginTrack.blocked,
        failedAttemps: loginTrack.failedAttempts,
      });
    }
    if (
      loginTrack.success &&
      loginTrack.accessToken &&
      loginTrack.refreshToken
    ) {
      res.cookie('refreshToken', loginTrack.refreshToken, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        maxAge: MAX_AGE,
      });
      res.status(200).json({ accessToken: loginTrack.accessToken });
    }
  } catch (error) {
    logger.error(error);
    res.status(400).json({ error: 'Bad credentials' });
  }
}
