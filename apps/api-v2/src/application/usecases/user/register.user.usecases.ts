import { UserFactory } from '../../../domain/factories/user.factory';
import { Inject, Injectable } from '@nestjs/common';
import { PasswordHashInterface } from '../../services/hash.service';
import { EmailServiceInterface } from '../../services/email.service';
import { TokenServiceInterface } from '../../services/token.service';
import { UserAdapter } from 'src/infrastructure/kysely/adapters/user.adapter';
import { CreateUserDTO } from '../../dto/create-user.dto';
import { ApplicationException } from '../../exceptions/application.exception';
import { NestEnvVariableAdapterService } from 'src/infrastructure/service/env.adapter.service';
import { UserPreferencesService } from 'src/domain/services/user-prefrerences/user-preferences.service';
import { EmitEventInterface } from 'src/application/services/event.service';

const VALID_TIME = '1h';

@Injectable()
export class RegisterUserUsecases {
  constructor(
    private readonly userFactory: UserFactory,
    private readonly userAdapter: UserAdapter,
    private readonly envVariableService: NestEnvVariableAdapterService,
    @Inject('PasswordService')
    private readonly passwordService: PasswordHashInterface,
    @Inject('EmailService')
    private readonly emailService: EmailServiceInterface,
    @Inject('TokenService')
    private readonly tokenService: TokenServiceInterface,
    private readonly userPreferencesService: UserPreferencesService,
    @Inject('EmitEventService') private eventEmitter: EmitEventInterface,
  ) { }
  async createUser(data: CreateUserDTO) {
    const emailKey = this.envVariableService.getEnvVariable(
      'JWT_EMAIL_TOKEN_KEY',
    );
    const newUser = this.userFactory.create(data.email, data.password);
    let hashedPassword: string;
    try {
      hashedPassword = await this.passwordService.hash(data.password);
    } catch (error) {
      throw new ApplicationException(
        'Could not hash password',
        'Register User Usecases',
      );
    }
    await this.userAdapter.save({
      id: newUser.id,
      email: data.email,
      password: hashedPassword,
    });
    await this.userPreferencesService.generate(newUser.id);
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
    this.eventEmitter.userCreated({ profileId: newUser.id });
    return { message: 'Check your email to verify your account' };
  }
}
