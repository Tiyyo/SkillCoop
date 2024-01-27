import { Request, Response } from 'express';
import { UserInfosToken } from '@skillcoop/types';
import checkParams from '../../utils/check-params.js';
import tokenHandler from '../../helpers/token.handler.js';
import ServerError from '../../helpers/errors/server.error.js';
import { user as User } from '../../models/index.js';
import { CLIENT_URL } from '../../utils/variables.js';

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
