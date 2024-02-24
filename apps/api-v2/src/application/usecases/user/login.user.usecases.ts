import { Inject, Injectable } from '@nestjs/common';
import { EmailServiceInterface } from 'src/application/services/email.service';
import { TokenServiceInterface } from 'src/application/services/token.service';
import { LoginAttemptReturn } from 'src/config/types';
import { UserCredentialsValidatorService } from 'src/domain/services/user/user-credentials-validator.service';
import { UserAdapter } from 'src/infrastructure/kysely/adapters/user.adapter';
import { NestEnvVariableAdapterService } from 'src/infrastructure/service/env.adapter.service';

@Injectable()
export class LoginUserUsecases {
  constructor(
    private readonly userAdapter: UserAdapter,
    @Inject('TokenService')
    private readonly tokenService: TokenServiceInterface,
    @Inject('EmailService')
    private readonly emailService: EmailServiceInterface,
    private readonly envVariableService: NestEnvVariableAdapterService,
    private readonly userCredentialsValidatorService: UserCredentialsValidatorService,
  ) { }
  async handle(email: string, password: string) {
    const loginTrack: LoginAttemptReturn = {
      success: false,
      status: 200,
    };
    const user = await this.userAdapter.findOne({ email: email.trim() });

    if (!user) {
      loginTrack.error = 'Bad credentials';
      loginTrack.status = 400;
      return loginTrack;
    }
    if (user.blocked) {
      loginTrack.error = `Your account has been blocked. However, you can still reset your password to regain access to your account.`;
      loginTrack.status = 403;
      return loginTrack;
    }
    if (user.verified === 0) {
      loginTrack.error = `Your account has not been verified yet. We have sent a new link to your email for account validation.`;
      loginTrack.status = 403;
      const JWTEmailKey = this.envVariableService.getEnvVariable(
        'JWT_EMAIL_TOKEN_KEY',
      );
      const emailToken = await this.tokenService.generateToken(
        '1h',
        JWTEmailKey,
        {
          user_id: user.id,
        },
      );
      await this.emailService.confirmEmail(user.email, emailToken, user.id);
    }
    const track =
      await this.userCredentialsValidatorService.validateCredentials(
        password,
        user,
      );
    if (!track) {
      loginTrack.error = 'Bad credentials';
      loginTrack.status = 400;
      return loginTrack;
    }
    if (track !== 'success') {
      loginTrack.failedAttempts = track?.failed_attempts;
      loginTrack.error = `You have only ${5 - loginTrack.failedAttempts
        } attempt number left before you account is blocked. `;
      return loginTrack;
    }
    const { accessToken, refreshToken } =
      await this.tokenService.generateAuthTokens(user.id);
    loginTrack.accessToken = accessToken;
    loginTrack.refreshToken = refreshToken;
    loginTrack.success = true;
    return loginTrack;
  }
}
