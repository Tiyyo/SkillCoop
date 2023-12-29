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
import { CLIENT_URL } from '../utils/variables';
import bcrypt from 'bcrypt';
import APITypeError from '../helpers/errors/type.error';
import ForbidenError from '../helpers/errors/forbiden';
import { UserInfosToken } from 'skillcoop-types';

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
      } else throw new ServerError('Failed create user');
    } catch (error) {
      return res.status(400).send('Infos not valid');
    }

    const emailToken = tokenHandler.createToken(
      '1h',
      process.env.JWT_EMAIL_TOKEN_KEY as string,
      {
        user_id: newUser.id,
      },
    );
    await emailService.sendEmailToConfirmEmail({
      emailToken,
      email,
      userId: newUser.id,
    });

    return res.status(200).json({
      message:
        'A link to activate your account has been sent to provided email',
    });
  },
  async signin(req: Request, res: Response) {
    const { email, password } = req.body;
    const MAX_AGE = 1000 * 60 * 60 * 24 * 7; // 7 days

    const { accessToken, refreshToken } = await authService.login({
      email,
      password,
    });
    // production cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: MAX_AGE,
    });
    res.status(200).json({ accessToken });
  },
  async refresh(req: Request, res: Response) {
    const { decoded } = req.body;
    const user = await User.findByPk(decoded.user_id);
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
  },
  async logout(_req: Request, res: Response) {
    res.clearCookie('refreshToken', { sameSite: 'none', secure: true });

    // NEED TO SEND SOMETHING WITH STATUS IF NOT COOKIE IS NOT CLEAR
    res.status(204).end();
  },
  async googleAuth(req: Request, res: Response) {
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
      throw new ServerError(
        'Could not get email from google',
        'googleAuth',
        '105',
      );
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
  },
  async verifyEmail(req: Request, res: Response) {
    const { token } = req.params;
    const [userId] = checkParams(req.params.userId);

    const userInfos = tokenHandler.verifyTokenAndGetData(
      token,
      process.env.JWT_EMAIL_TOKEN_KEY as string,
    );
    if (userInfos && userId !== (userInfos as UserInfosToken).user_id)
      //eslint-disable-line
      throw new ServerError('User id is not matching', 'verifyEmail', ' 136');

    const verifiedUser = await User.update(userId, { verified: 1 });
    if (!verifiedUser)
      throw new ServerError("Couldn't verify user", 'verifyEmail', ' 144');

    res.status(300).redirect(`${CLIENT_URL}/login`);
  },
  async resendEmail(req: Request, res: Response) {
    const { email } = req.body;
    const [user] = await User.findBy({ email });

    if (!user)
      throw new NotFoundError(
        "Couldn't find user with email provided in database",
        'resendEmail',
        ' 152',
      );
    const emailToken = tokenHandler.createToken(
      '1h',
      process.env.JWT_EMAIL_TOKEN_KEY as string,
      {
        user_id: user.id,
      },
    );

    const url = `${process.env.API_URL}/auth/${user.id}/verify/${emailToken}`;
    const text = `Click on the link to verify your email: ${url}`;
    await emailService.sendVerify(email, 'validate your email', text);

    return res
      .status(200)
      .json({ message: 'A new confirmation email has been sent' });
  },
  async forgotPassword(req: Request, res: Response) {
    const { email } = req.body;
    const [user] = await User.findBy({ email });
    if (user && user.verified === 0) {
      throw new ForbidenError(
        'User accound not verified',
        'Not allowed',
        'forgotPassword',
        ' 169',
      );
    }

    if (user && user.verified === 1) {
      const resetPasswordToken = tokenHandler.createToken(
        '10m',
        process.env.JWT_EMAIL_TOKEN_KEY as string,
        {
          user_id: user.id,
        },
      );
      await emailService.sendLinkRestPassword({
        resetToken: resetPasswordToken,
        email: email,
        userId: user.id,
      });
    }

    res.status(200).json({
      message: 'If you have a valid account an email has been sent',
    });
  },
  async redirectToResetPassword(req: Request, res: Response) {
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
          ' 193',
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
  },
  async verifyResetPasswordToken(req: Request, res: Response) {
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
  },
  async resetPassword(req: Request, res: Response) {
    const { password } = req.body;
    const saltRouds = 10;
    const hashedPassword = await bcrypt
      .hash(password, saltRouds)
      .catch((err) => {
        if (err)
          throw new ServerError(
            "Couldn't hash user password",
            'resetPassword',
            ' 231',
          );
      });
    // ??? why ???
    if (!hashedPassword) throw new ServerError('hash password is missing');

    const token = req.cookies._rset;
    try {
      const infos = tokenHandler.verifyTokenAndGetData(
        token,
        process.env.JWT_EMAIL_TOKEN_KEY as string,
      );
      if (!infos || !infos.user_id)
        return res.status(200).json({ message: 'expire' });
      if (infos && infos.user_id) {
        await User.update(+infos.user_id, { password: hashedPassword });
        res.status(200).json({ message: 'success' });
      }
    } catch (error) {
      return res.status(200).json({ message: 'expire' });
    }
  },
};
