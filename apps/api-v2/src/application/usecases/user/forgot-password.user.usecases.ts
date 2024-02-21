import { ForbiddenException, Inject, NotFoundException } from '@nestjs/common';
import { EmailServiceInterface } from 'src/application/services/email.service';
import { TokenServiceInterface } from 'src/application/services/token.service';
import { UserAdapter } from 'src/infrastructure/kysely/adapters/user.adapter';
import { NestEnvVariableAdapterService } from 'src/infrastructure/service/env.adapter.service';

const VALID_TOKEN_DURATION = '10m';

export class ForgotPasswordUserUsecases {
  constructor(
    private readonly userAdapter: UserAdapter,
    private readonly envVarible: NestEnvVariableAdapterService,
    @Inject('EmailService')
    private readonly emailService: EmailServiceInterface,
    @Inject('TokenService')
    private readonly tokenService: TokenServiceInterface,
  ) { }
  async handle(email: string) {
    const emailKey = this.envVarible.getEnvVariable('JWT_EMAIL_TOKEN_KEY');
    const user = await this.userAdapter.findOne({ email });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (!user.verified) {
      throw new ForbiddenException('User not verified');
    }
    const token = await this.tokenService.generateToken(
      VALID_TOKEN_DURATION,
      emailKey,
      { user_id: user.id },
    );
    await this.emailService.resetPassword(user.email, token, user.id);
  }
}
