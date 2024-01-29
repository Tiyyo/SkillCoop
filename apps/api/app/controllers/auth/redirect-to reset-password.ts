import { Request, Response } from 'express';
import checkParams from '../../utils/check-params.js';
import tokenHandler from '../../helpers/token.handler.js';
import ServerError from '../../helpers/errors/server.error.js';
import { CLIENT_URL } from '../../utils/variables.js';

export async function redirectToResetPassword(req: Request, res: Response) {
  const { token } = req.params;
  const [userId] = checkParams(req.params.userId);
  try {
    const userInfos = tokenHandler.verifyTokenAndGetData(
      token,
      process.env.JWT_EMAIL_TOKEN_KEY as string,
    );
    if (userInfos && userId !== userInfos.user_id) {
      throw new ServerError(
        'User id is not matching',
        'redirectToResetPassword',
      );
    }
  } catch (error) {
    return res.redirect(`${CLIENT_URL}/`);
  }

  res.cookie('_rset', token, {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
    domain: process.env.DOMAIN,
    maxAge: 10 * 60 * 1000,
  });
  res.status(301).redirect(`${CLIENT_URL}/reset-password`);
}
