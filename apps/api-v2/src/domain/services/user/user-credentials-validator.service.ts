import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { PasswordHashInterface } from 'src/application/services/hash.service';
import { UserDBEntity } from 'src/domain/entities/user.entity';
import { DomainException } from 'src/domain/shared/domain-exception';
import { UserLoginAttemptsService } from './login-attemps.service';

@Injectable()
export class UserCredentialsValidatorService {
  constructor(
    @Inject('PasswordService')
    private readonly passwordHashService: PasswordHashInterface,
    private readonly loginAttemptsService: UserLoginAttemptsService,
  ) { }
  async validateCredentials(password: string, user: UserDBEntity) {
    if (!user)
      throw new DomainException(
        'User is missing',
        'UserCredentialsValidatorService',
      );
    if (user.blocked || !user.verified)
      throw new ForbiddenException('User is blocked or not verified');

    const isPasswordValid = await this.passwordHashService.compare(
      password,
      user.password,
    );
    if (!isPasswordValid) {
      return await this.loginAttemptsService.handleFailedAttemp(user);
    }
    return 'success';
  }
}
