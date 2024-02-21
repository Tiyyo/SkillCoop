import { ForbiddenException, Inject, NotFoundException } from '@nestjs/common';
import { EmailDTO } from 'src/application/dto/email.dto';
import { EmailServiceInterface } from 'src/application/services/email.service';
import { TokenServiceInterface } from 'src/application/services/token.service';
import { UserAdapter } from 'src/infrastructure/kysely/adapters/user.adapter';

const VALID_TOKEN_DURATION = '10m';
const emailKey = 'provisional email for dev purposes';

export class ForgotPasswordUserUsecases {
  constructor(
    private readonly userAdapter: UserAdapter,
    @Inject('EmailService')
    private readonly emailService: EmailServiceInterface,
    @Inject('TokenService')
    private readonly tokenService: TokenServiceInterface,
  ) { }
  async handle(email: string) {
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
