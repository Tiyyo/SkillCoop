import { vi, describe, beforeEach, it, expect } from 'vitest';
import { DateProvider } from 'src/domain/services/date.provider.service';
import { UserAdapter } from 'src/infrastructure/kysely/adapters/user.adapter';
import { Kysely } from 'kysely';
import { DB } from 'src/infrastructure/kysely/database.type';
import { UserLoginAttemptsService } from 'src/domain/services/user/login-attemps.service';
import { UserAccountService } from 'src/domain/services/user/user-account.service';
import { LoginAttempsCounterService } from 'src/domain/services/user/login-attempts-counter.service';

describe('UserLoginAttemptsService', () => {
  let service: UserLoginAttemptsService;
  let dateProvider: DateProvider;
  let userAccount: UserAccountService;
  let loginAttemptsCounter: LoginAttempsCounterService;
  let userAdapter: UserAdapter;
  let dbClient: Kysely<DB>;

  beforeEach(async () => {
    dateProvider = new DateProvider();
    userAdapter = new UserAdapter(dbClient);
    userAccount = new UserAccountService(userAdapter);
    loginAttemptsCounter = new LoginAttempsCounterService(userAdapter);
    service = new UserLoginAttemptsService(
      dateProvider,
      userAccount,
      loginAttemptsCounter,
    );
  });

  it('should reset attempts count if the interval is greater than 24 hours', async () => {
    const user = {
      email: 'test@test.com',
      password: 'password',
      verified: 1,
      blocked: 0,
      failed_attempts: 0,
      updated_at: '2021-01-01T00:00:00.000Z',
    };
    vi.spyOn(dateProvider, 'intervalFromToday').mockImplementation(
      () => 1000 * 60 * 60 * 25,
    );
    vi.spyOn(loginAttemptsCounter, 'resetCounter');
    loginAttemptsCounter.increase = vi.fn();
    loginAttemptsCounter.resetCounter = vi.fn();
    userAccount.block = vi.fn();
    await service.handleFailedAttemp(user);
    expect(loginAttemptsCounter.resetCounter).toHaveBeenCalled();
  });
  it('should not reset attempts count if the interval is less than 24 hours', async () => {
    const user = {
      email: 'test@test.com',
      password: 'password',
      verified: 1,
      blocked: 0,
      failed_attempts: 0,
      updated_at: '2021-01-01T00:00:00.000Z',
    };
    vi.spyOn(dateProvider, 'intervalFromToday').mockImplementation(
      () => 1000 * 60 * 60 * 10,
    );
    vi.spyOn(loginAttemptsCounter, 'resetCounter');
    loginAttemptsCounter.increase = vi.fn();
    loginAttemptsCounter.resetCounter = vi.fn();
    userAccount.block = vi.fn();
    await service.handleFailedAttemp(user);
    expect(loginAttemptsCounter.resetCounter).not.toHaveBeenCalled();
  });
  it('should increase attempts count if the user eligible', async () => {
    const user = {
      email: 'test@test.com',
      password: 'password',
      verified: 1,
      blocked: 0,
      failed_attempts: 0,
      updated_at: '2021-01-01T00:00:00.000Z',
    };
    vi.spyOn(dateProvider, 'intervalFromToday').mockImplementation(
      () => 1000 * 60 * 60 * 10,
    );
    vi.spyOn(loginAttemptsCounter, 'resetCounter');
    loginAttemptsCounter.increase = vi.fn();
    loginAttemptsCounter.resetCounter = vi.fn();
    userAccount.block = vi.fn();
    await service.handleFailedAttemp(user);
    expect(loginAttemptsCounter.resetCounter).not.toHaveBeenCalled();
    expect(loginAttemptsCounter.increase).toHaveBeenCalled();
  });
  it('should block the user if the attempts count is 4', async () => {
    const user = {
      email: 'test@test.com',
      password: 'password',
      verified: 1,
      blocked: 0,
      failed_attempts: 4,
      updated_at: '2021-01-01T00:00:00.000Z',
    };
    vi.spyOn(dateProvider, 'intervalFromToday').mockImplementation(
      () => 1000 * 60 * 60 * 10,
    );
    vi.spyOn(loginAttemptsCounter, 'resetCounter');
    loginAttemptsCounter.increase = vi.fn();
    loginAttemptsCounter.resetCounter = vi.fn();
    userAccount.block = vi.fn();
    await service.handleFailedAttemp(user);
    expect(loginAttemptsCounter.resetCounter).not.toHaveBeenCalled();
    expect(loginAttemptsCounter.increase).toHaveBeenCalled();
    expect(userAccount.block).toHaveBeenCalled();
  });
});
