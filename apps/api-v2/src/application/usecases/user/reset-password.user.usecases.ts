import { Inject, Injectable } from '@nestjs/common';
import { ApplicationException } from 'src/application/exceptions/application.exception';
import { PasswordHashInterface } from 'src/application/services/hash.service';
import { TokenServiceInterface } from 'src/application/services/token.service';
import { UserAccountService } from 'src/domain/services/user/user-account.service';
import { NestEnvVariableAdapterService } from 'src/infrastructure/service/env.adapter.service';

@Injectable()
export class ResetPasswordUserUsecases {
  constructor(
    private readonly envVariableService: NestEnvVariableAdapterService,
    private readonly userAccountService: UserAccountService,
    @Inject('PasswordService')
    private readonly passwordService: PasswordHashInterface,
    @Inject('TokenService')
    private readonly tokenService: TokenServiceInterface,
  ) {}
  async handle(token: string, password: string) {
    const JwtEmailKey = this.envVariableService.getEnvVariable(
      'JWT_EMAIL_TOKEN_KEY',
    );
    const hashedPassword = await this.passwordService.hash(password);

    const decoded = await this.tokenService.verifyToken(token, JwtEmailKey);

    if (!decoded || !decoded.user_id) {
      throw new ApplicationException(
        'Reset token password dont have user_id payload inside it',
        'ResetPasswordUserUsecases',
      );
    }
    await this.userAccountService.resetPassword(
      decoded.user_id,
      hashedPassword,
    );
  }
}
