import { Request, Response } from 'express';
import APITypeError from '../../helpers/errors/type.error.js';
import ServerError from '../../helpers/errors/server.error.js';
import {
  user as User,
  profile as Profile,
  image as Image,
} from '../../models/index.js';
import google from '../../services/auth/google.js';
import authService from '../../services/auth/auth.js';
import tokenHandler from '../../helpers/token.handler.js';
import { CLIENT_URL } from '../../utils/variables.js';

export async function googleAuth(req: Request, res: Response) {
  const { code } = req.query;
  if (typeof code !== 'string')
    throw new APITypeError(
      'Code provided is not a string',
      'googleAuth',
      ' 93',
    );

  const { access_token: googleToken, id_token } = await google.getOAuthToken({
    code,
  });

  if (!googleToken || !id_token)
    throw new ServerError('Error getting token from google ');

  const { email, given_name, family_name, picture } = await google.getUser({
    access_token: googleToken,
    id_token,
  });

  if (!email)
    throw new ServerError('Could not get email from google', 'googleAuth');

  const user = await User.findOne({ email });
  let userInfos;
  if (!user) {
    userInfos = await authService.createGoogleUser({
      email,
      given_name,
      family_name,
      picture,
    });
  } else {
    const profile = await Profile.findOne({ profile_id: user.id });
    if (!profile) {
      const username = `${given_name} ${family_name[0]}.`;
      await User.updateOne({ id: user.id }, { verified: 1 });
      await Image.createOne({ url: picture });
      await Profile.createOne({
        username,
        avatar_url: picture,
        first_name: given_name,
        last_name: family_name,
        profile_id: user.id,
      });
    }
    userInfos = { user_id: user.id };
  }
  // TODO think about to automaticly update profile with google information
  const { accessToken, refreshToken } =
    tokenHandler.createPairAuthToken(userInfos);

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
  res
    .status(301)
    .redirect(`${CLIENT_URL}/auth/google/?access_token=${accessToken}`);
}
