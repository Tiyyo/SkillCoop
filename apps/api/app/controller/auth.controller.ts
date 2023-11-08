import { Request, Response } from 'express';
import authService from '../service/auth/auth';
import google from '../service/auth/google';
import { user as User } from '../models/index';
import ServerError from '../helpers/errors/server.error';
import emailService from '../utils/send-email';
import checkParams from '../utils/check-params';
import NotFoundError from '../helpers/errors/not-found.error';
import tokenHandler from '../helpers/token.handler';
import AuthorizationError from '../helpers/errors/unauthorized.error';
import logger from '../helpers/logger';
import { HOST, CLIENT_URL } from '../utils/variables'

export default {
  async register(req: Request, res: Response) {
    const { email, password } = req.body;
    let newUser: { id: number; email: string };

    try {
      const shouldCreateNewUser = await authService.createUser({
        email,
        password,
      });
      if (shouldCreateNewUser) {
        newUser = shouldCreateNewUser;
      }
      else throw new ServerError('Failed create user');

    } catch (error) {
      return res
        .status(400)
        .send("We couldn't create a new account with this informations");
    }

    const emailToken = tokenHandler.createToken(
      '1h',
      process.env.JWT_EMAIL_TOKEN_KEY as string,
      { user_id: newUser.id },
    );
    await emailService.sendEmailToConfirmEmail({
      emailToken,
      email,
      userId: newUser.id,
    });

    return res.status(200).json({
      message: 'User created successfully and confirmation email has been sent',
    });
  },
  async signin(req: Request, res: Response) {
    const { email, password } = req.body;
    const MAX_AGE = 1000 * 60 * 60 * 24 * 7; // 7 days

    try {
      const { accessToken, refreshToken } = await authService.login({
        email,
        password,
      });
      // production cookie
      // res.cookie('refreshToken', refreshToken, {
      //   httpOnly: true,
      //   sameSite: 'none',
      //   secure: true,
      //   maxAge: MAX_AGE,
      // });
      // testing cookie
      console.log("host where cookies goes", HOST);
      console.log("client url", CLIENT_URL);
      res.cookie('refreshToken', refreshToken, { domain: HOST, path: '/', maxAge: MAX_AGE, sameSite: 'none' });

      res.status(200).json({ accessToken });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      logger.error(error);
    }
  },
  async refresh(req: Request, res: Response) {
    const { decoded } = req.body;
    const user = await User.findByPk(decoded.user_id);
    if (!user) {
      res.clearCookie('refreshToken', { domain: HOST, path: '/' });
      throw new AuthorizationError('Unauthorized');
    }
    const accessToken = tokenHandler.createToken(
      '15m',
      process.env.JWT_TOKEN_KEY as string,
      decoded,
    );

    res.status(200).json({ accessToken });
  },
  async logout(_req: Request, res: Response) {
    res.clearCookie('refreshToken', { domain: HOST, path: '/' });

    res.status(204).send('Logged out');
  },
  async googleAuth(req: Request, res: Response) {
    const { code } = req.query;
    if (typeof code !== 'string') throw new Error('Invalid type');

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
      throw new ServerError('Error getting email from google account');
    const [user] = await User.findBy({ email });

    let userInfos;
    if (!user) {
      userInfos = await authService.createGoogleUser({
        email,
        given_name,
        family_name,
        picture,
      });
    } else {
      // TODO think about to automaticly update profile with google information
      userInfos = { user_id: user.id, email: user.email };
    }
    console.log('What i store in token : ', userInfos);
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
      .redirect(
        `${CLIENT_URL}/auth/google/?access_token=${accessToken}`,
      );
  },
  async verifyEmail(req: Request, res: Response) {
    const { token } = req.params;
    const [userId] = checkParams(req.params.userId);

    const userInfos = tokenHandler.verifyTokenAndGetData(
      token,
      process.env.JWT_EMAIL_TOKEN_KEY as string,
    );
    if (userInfos && userId !== (userInfos as any).user_id) //eslint-disable-line
      throw new ServerError('Invalid user id');

    const verifiedUser = await User.update(userId, { verified: 1 });
    if (!verifiedUser) throw new ServerError("Couldn't update user");

    res.status(300).redirect(`${CLIENT_URL}/login`);
  },
  async resendEmail(req: Request, res: Response) {
    const { email } = req.body;
    const [user] = await User.findBy({ email });

    if (!user) throw new NotFoundError("Couldn't find user");
    const emailToken = tokenHandler.createToken(
      '1h',
      process.env.JWT_EMAIL_TOKEN_KEY as string,
      { user_id: user.id },
    );

    const url = `${process.env.API_URL}/auth/${user.id}/verify/${emailToken}`;
    const text = `Click on the link to verify your email: ${url}`;
    await emailService.sendVerify(email, 'validate your email', text);

    return res
      .status(200)
      .json({ message: 'A new confirmation email has been sent' });
  },
};
