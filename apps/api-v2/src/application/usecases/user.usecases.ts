import { UserFactory } from '../../domain/factories/user.factory';
import { Inject, Injectable } from '@nestjs/common';
import { PasswordHashInterface } from '../hash-service';
import { EmailServiceInterface } from '../email-service';
import { TokenServiceInterface } from '../token-service';
import { UserAdapter } from 'src/infrastructure/kysely/adapters/user.adapter';

const emailKey = 'provisional email for dev purposes';
const VALID_TIME = '1h';

@Injectable()
export class UserUsecases {
  constructor(
    private readonly userFactory: UserFactory,
    private readonly userAdapter: UserAdapter,
    @Inject('PasswordService')
    private readonly passwordService: PasswordHashInterface,
    @Inject('EmailService')
    private readonly emailService: EmailServiceInterface,
    @Inject('TokenService')
    private readonly tokenService: TokenServiceInterface,
  ) { }
  async createUser(data: any) {
    const newUser = this.userFactory.create(data.email, data.password);
    const hashedPassword = await this.passwordService.hash(data.password);
    await this.userAdapter.save({
      id: newUser.id,
      email: data.email,
      password: hashedPassword,
    });
    const emailToken = await this.tokenService.generateToken(
      VALID_TIME,
      emailKey,
      { user_id: newUser.id },
    );
    await this.emailService.confirmEmail(
      newUser.email,
      emailToken,
      newUser.id.toString(),
    );
    return newUser;
  }
}
