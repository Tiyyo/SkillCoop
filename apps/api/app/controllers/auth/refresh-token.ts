import { Request, Response } from 'express';
import { user as User } from '#models';
import tokenHandler from '#helpers/token.handler';
import AuthorizationError from '#errors/unauthorized.error';

export async function refresh(req: Request, res: Response) {
  const { decoded } = req.body;
  // const user = await User.findOne({ id: decoded.user_id });
  const user = await User.findOne({ id: decoded.user_id });
  if (!user) {
    res.clearCookie('refreshToken', { sameSite: 'none', secure: true });
    throw new AuthorizationError('Unauthorized');
  }
  const accessToken = tokenHandler.createToken(
    '15m',
    process.env.JWT_TOKEN_KEY as string,
    decoded,
  );

  res.status(200).json({ accessToken });
}
