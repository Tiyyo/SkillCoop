import DatabaseError from '../../helpers/errors/database.error.js';
import ServerError from '../../helpers/errors/server.error.js';
import { user as User } from '../../models/index.js';
import { image as Image } from '../../models/index.js';
import { profile as Profile } from '../../models/index.js';
import bcrypt from 'bcrypt';
import emailService from '../../utils/send-email.js';
import randomBytes from 'randombytes';
import tokenHandler from '../../helpers/token.handler.js';
import type { UserInfosToken, GoogleUserInfos } from '@skillcoop/types';
import { UserPreferenceHandler } from '../user-preference/index.js';
import { LoginAttemptReturn } from '../../@types/types.js';
import { CredentialsValidator } from './credentials-validator.js';

export default {
  async createUser(data: {
    email: string;
    password: string;
  }): Promise<{ id: number; email: string } | undefined> {
    const { email, password } = data;
    const saltRouds = 10;

    try {
      const hashedPassword = await bcrypt
        .hash(password, saltRouds)
        .catch((err) => {
          if (err) throw new ServerError("Couldn't hash user password");
        });

      if (!hashedPassword) throw new ServerError('hash password is missing');

      const newUser = await User.create({
        email,
        password: hashedPassword,
      });
      if (!newUser)
        throw new ServerError(
          'Error creating user',
          'AuthService.createUser',
          'line 39',
        );
      await new UserPreferenceHandler(newUser.id).generateDefault();
      return newUser;
    } catch (error) {
      if (error instanceof Error) {
        throw new DatabaseError(error);
      }
    }
  },
  async login(data: { email: string; password: string }) {
    const loginTrack: LoginAttemptReturn = {
      success: false,
      status: 200,
    };

    const { email, password } = data;
    const user = await User.findOne({ email });
    if (!user) {
      loginTrack.error = 'Bad credentials';
      loginTrack.status = 400;
      return loginTrack;
    }
    if (user.blocked) {
      loginTrack.error = `Your account has been blocked. However, 
      you can still reset your password to regain access to your account.`;
      loginTrack.status = 403;
      return loginTrack;
    }
    if (user.verified === 0) {
      loginTrack.error = `Your account has not been verified yet. 
      We have sent a new link to your email for account validation.`;
      loginTrack.status = 403;
      const emailToken = tokenHandler.createToken(
        '1h',
        process.env.JWT_EMAIL_TOKEN_KEY as string,
        {
          user_id: user.id,
        },
      );
      await emailService.sendEmailToConfirmEmail({
        emailToken,
        email,
        userId: user.id,
      });
      return loginTrack;
    }
    const credentialsValidator = new CredentialsValidator(
      email,
      password,
      user,
    );
    const track = await credentialsValidator.validate();
    if (!track) {
      loginTrack.error = 'Bad credentials';
      loginTrack.status = 400;
      return loginTrack;
    }
    if (track !== 'success') {
      loginTrack.failedAttempts = track?.failed_attempts;
      loginTrack.error = `You have only 
      number left before you account is blocked. `;
      return loginTrack;
    }

    const userInfos: UserInfosToken = { user_id: user.id, email: user.email };
    const { accessToken, refreshToken } =
      tokenHandler.createPairAuthToken(userInfos);
    loginTrack.accessToken = accessToken;
    loginTrack.refreshToken = refreshToken;
    loginTrack.success = true;
    return loginTrack;
  },
  async createGoogleUser({
    email,
    given_name,
    family_name,
    picture,
  }: GoogleUserInfos): Promise<UserInfosToken> {
    const password = randomBytes(16).toString('hex');
    const user = await this.createUser({ email, password });
    if (!user) throw new Error('Error creating user');

    // We need to get user_id in order to update verified status
    // TODO look if we cannot get insert id when create a new user
    const userCreated = await User.findOne({ email: user.email });
    if (!userCreated) throw new ServerError('Error creating user');

    const username = `${given_name} ${family_name[0]}.`;
    await User.updateOne({ id: userCreated.id }, { verified: 1 });
    await Image.createOne({ url: picture });
    await Profile.createOne({
      username,
      avatar_url: picture,
      first_name: given_name,
      last_name: family_name,
      user_id: userCreated.id,
    });
    return { user_id: userCreated.id, email: userCreated.email };
  },
};
