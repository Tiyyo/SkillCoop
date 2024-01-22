import { Request, Response } from 'express';
import tokenHandler from '#helpers/token.handler';
import checkParams from '#utils/check-params';
import { UserInfosToken } from '@skillcoop/types';
import ServerError from '#errors/server.error';
import { CLIENT_URL } from '#utils/variables';
import { user as User } from '#models';

export async function verifyEmail(req: Request, res: Response) {
  const { token } = req.params;
  const [userId] = checkParams(req.params.userId);

  const userInfos = tokenHandler.verifyTokenAndGetData(
    token,
    process.env.JWT_EMAIL_TOKEN_KEY as string,
  );

  if (userInfos && userId !== (userInfos as UserInfosToken).user_id)
    //eslint-disable-line
    throw new ServerError('User id is not matching', 'verifyEmail');

  const verifiedUser = await User.updateOne({ id: userId }, { verified: 1 });

  if (!verifiedUser)
    throw new ServerError("Couldn't verify user", 'verifyEmail');

  res.status(300).redirect(`${CLIENT_URL}/verify-email/success`);
}
