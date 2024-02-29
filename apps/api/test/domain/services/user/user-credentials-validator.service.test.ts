import { vi, describe, beforeEach, it, expect } from 'vitest';
import { UserAdapter } from 'src/infrastructure/kysely/adapters/user.adapter';
import { DateProvider } from 'src/domain/services/date.provider.service';
import { Kysely } from 'kysely';
import { DB } from 'src/infrastructure/kysely/database.type';
import { UserCredentialsValidatorService } from 'src/domain/services/user/user-credentials-validator.service';
import { UserAccountService } from 'src/domain/services/user/user-account.service';
import { LoginAttempsCounterService } from 'src/domain/services/user/login-attempts-counter.service';
import { PasswordHashInterface } from 'src/application/services/hash.service';
import { UserLoginAttemptsService } from 'src/domain/services/user/login-attemps.service';
import { BcryptAdapterService } from 'src/infrastructure/service/bcrypt.adapter.service';

describe('UserCredentialsValidatorService', () => {
  let service: UserCredentialsValidatorService;
  let userAdapter: UserAdapter;
  let dateProvider: DateProvider;
  let userAccountService: UserAccountService;
  let loginAttemptsCounterService: LoginAttempsCounterService;
  let passwordService: PasswordHashInterface;
  let loginAttemptsService: UserLoginAttemptsService;
  let dbClient: Kysely<DB>;
  beforeEach(async () => {
    userAdapter = new UserAdapter(dbClient);
    dateProvider = new DateProvider();
    userAccountService = new UserAccountService(userAdapter);
    loginAttemptsCounterService = new LoginAttempsCounterService(userAdapter);
    passwordService = new BcryptAdapterService();
    loginAttemptsService = new UserLoginAttemptsService(
      dateProvider,
      userAccountService,
      loginAttemptsCounterService,
    );
    service = new UserCredentialsValidatorService(
      passwordService,
      loginAttemptsService,
    );
  });
  it('should throw a forbidden exception if the user is blocked', async () => {
    const user = {
      email: 'test@test.com',
      password: 'password',
      verified: 1,
      blocked: 1,
      failed_attempts: 0,
      updated_at: '2021-01-01T00:00:00.000Z',
    };
    await expect(service.validateCredentials('password', user)).rejects.toThrow(
      'User is blocked or not verified',
    );
  });
  it('should throw a forbidden exception if the user is not verified', async () => {
    const user = {
      email: 'test@test.com',
      password: 'password',
      verified: 0,
      blocked: 0,
      failed_attempts: 0,
      updated_at: '2021-01-01T00:00:00.000Z',
    };
    await expect(service.validateCredentials('password', user)).rejects.toThrow(
      'User is blocked or not verified',
    );
  });
  it('it should call the loginAttemptsService if the password is invalid', async () => {
    const user = {
      email: 'test@test.com',
      password: 'password',
      verified: 1,
      blocked: 0,
      failed_attempts: 0,
      updated_at: '2021-01-01T00:00:00.000Z',
    };
    vi.spyOn(loginAttemptsService, 'handleFailedAttemp');
    loginAttemptsService.handleFailedAttemp = vi.fn();
    passwordService.compare = vi.fn().mockResolvedValue(false);
    await service.validateCredentials('password', user);
    expect(loginAttemptsService.handleFailedAttemp).toHaveBeenCalled();
  });
  it('should return success if the password is valid', async () => {
    const user = {
      email: 'test@test.com',
      password: 'password',
      verified: 1,
      blocked: 0,
      failed_attempts: 0,
      updated_at: '2021-01-01T00:00:00.000Z',
    };
    vi.spyOn(loginAttemptsService, 'handleFailedAttemp');
    loginAttemptsService.handleFailedAttemp = vi.fn();
    passwordService.compare = vi.fn().mockResolvedValue(true);
    await service.validateCredentials('password', user);
    expect(loginAttemptsService.handleFailedAttemp).not.toHaveBeenCalled();
  });
});
