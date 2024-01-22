import { Request, Response } from 'express';
import tokenHandler from '#helpers/token.handler';

export async function verifyResetPasswordToken(req: Request, res: Response) {
  const token = req.cookies._rset;
  try {
    const infos = tokenHandler.verifyTokenAndGetData(
      token,
      process.env.JWT_EMAIL_TOKEN_KEY as string,
    );

    if (infos && !infos.user_id) {
      return res.status(200).json({ message: 'expire' });
    }
    res.status(200).json({ message: 'success' });
  } catch (error) {
    return res.status(200).json({ message: 'expire' });
  }
}
