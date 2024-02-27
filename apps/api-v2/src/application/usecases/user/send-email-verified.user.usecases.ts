import { Inject, Injectable } from '@nestjs/common';
import { ApplicationException } from 'src/application/exceptions/application.exception';
import { RessourceNotFoundException } from 'src/application/exceptions/ressource-not-found.exception';
import { EmailServiceInterface } from 'src/application/services/email.service';
import { TokenServiceInterface } from 'src/application/services/token.service';
import { UserAdapter } from 'src/infrastructure/kysely/adapters/user.adapter';
import { NestEnvVariableAdapterService } from 'src/infrastructure/service/env.adapter.service';

@Injectable()
export class SendVerificationEmailUserUsecases {
  constructor(
    private readonly envVariableService: NestEnvVariableAdapterService,
    private readonly userAdapter: UserAdapter,
    @Inject('TokenService')
    private readonly tokenService: TokenServiceInterface,
    @Inject('EmailService')
    private readonly emailService: EmailServiceInterface,
  ) { }
  async handle(email: string) {
    const user = await this.userAdapter.findOne({ email });
    if (!user) {
      throw new RessourceNotFoundException(
        'Could not find user with this email',
        'SendVerificationEmailUserUsecases',
      );
    }
    const JWTEmailKey = this.envVariableService.getEnvVariable(
      'JWT_EMAIL_TOKEN_KEY',
    );
    const token = await this.tokenService.generateToken('1h', JWTEmailKey, {
      user_id: user.id,
    });
    await this.emailService.confirmEmail(user.email, token, user.id);
  }
}
