import { vi, describe, beforeEach, it, expect } from 'vitest';
import { UserAdapter } from 'src/infrastructure/kysely/adapters/user.adapter';
import { Kysely } from 'kysely';
import { DB } from 'src/infrastructure/kysely/database.type';
import { LoginAttempsCounterService } from 'src/domain/services/user/login-attempts-counter.service';

describe('LoginAttempsCounterService', () => {
  let service: LoginAttempsCounterService;
  let userAdapter: UserAdapter;
  let dbClient: Kysely<DB>;
  const email = 'test@test.com';
  beforeEach(async () => {
    userAdapter = new UserAdapter(dbClient);
    service = new LoginAttempsCounterService(userAdapter);
  });

  it('should reset counter', async () => {
    userAdapter.updateOne = vi.fn();
    await service.resetCounter(email);
    expect(userAdapter.updateOne).toHaveBeenCalledWith(
      { email },
      { failed_attempts: 0 },
    );
  });
  it('should increase counter', async () => {
    userAdapter.findOne = vi.fn().mockResolvedValue({ failed_attempts: 1 });
    userAdapter.updateWithReturn = vi
      .fn()
      .mockResolvedValue({ failed_attempts: 2 });
    await service.increase(email);
    expect(userAdapter.updateWithReturn).toHaveBeenCalledWith(
      { email },
      { failed_attempts: 2 },
    );
  });
  it('should throw a domain exception if the update fails', async () => {
    userAdapter.findOne = vi.fn().mockResolvedValue({ failed_attempts: 1 });
    userAdapter.updateWithReturn = vi
      .fn()
      .mockResolvedValue({ failed_attempts: 1 });
    await expect(service.increase(email)).rejects.toThrow();
  });
});
