import { Request, Response } from 'express';
import { user as User } from '../../models/index.js';
import AuthorizationError from '../../helpers/errors/unauthorized.error.js';
import tokenHandler from '../../helpers/token.handler.js';

export async function refresh(req: Request, res: Response) {
  const { decoded } = req.body;

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
