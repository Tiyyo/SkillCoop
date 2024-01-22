import { Request, Response } from 'express';
import tokenHandler from '#helpers/token.handler';
import { CLIENT_URL } from '#utils/variables';
import ServerError from '#errors/server.error';
import checkParams from '#utils/check-params';

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
