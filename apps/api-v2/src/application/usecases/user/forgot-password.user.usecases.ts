import { Inject } from '@nestjs/common';
import { EmailDTO } from 'src/application/dto/email.dto';
import { EmailServiceInterface } from 'src/application/email-service';
import { TokenServiceInterface } from 'src/application/token-service';
import { UserAdapter } from 'src/infrastructure/kysely/adapters/user.adapter';

export class ForgotPasswordUserUsecases {
  constructor(
    private readonly userAdapter: UserAdapter,
    @Inject('EmailService')
    private readonly emailService: EmailServiceInterface,
    @Inject('TokenService')
    private readonly tokenService: TokenServiceInterface,
  ) { }
  async handle(email: EmailDTO) {
    // find user by email
    // if not found throw error
    // if found and not verified throw error
    // generate token
    // send email
    const user = await this.userAdapter.findOne(email);
  }
}
