import { vi, describe, beforeEach, it, expect } from 'vitest';
import { UserAdapter } from 'src/infrastructure/kysely/adapters/user.adapter';
import { Kysely } from 'kysely';
import { DB } from 'src/infrastructure/kysely/database.type';
import { UserAccountService } from 'src/domain/services/user/user-account.service';

describe('UserAccountService', () => {
  let service: UserAccountService;
  let userAdapter: UserAdapter;
  let dbClient: Kysely<DB>;

  beforeEach(async () => {
    userAdapter = new UserAdapter(dbClient);
    service = new UserAccountService(userAdapter);
  });
  const email = 'test@test.com';
  it('should block user', async () => {
    userAdapter.updateWithReturn = vi.fn().mockResolvedValue({
      failed_attempts: 1,
      blocked: true,
    });

    await service.block(email);
    expect(userAdapter.updateWithReturn).toHaveBeenCalledWith(
      { email },
      { blocked: true },
    );
  });
  it('should unblock user', async () => {
    userAdapter.updateWithReturn = vi.fn().mockResolvedValue({
      failed_attempts: 1,
      blocked: false,
    });
    await service.unblock(email);
    expect(userAdapter.updateWithReturn).toHaveBeenCalledWith(
      { email },
      { blocked: false },
    );
  });
  it('should reset password', async () => {
    const newPassword = 'newPassword';
    userAdapter.updateWithReturn = vi.fn().mockResolvedValue({
      failed_attempts: 0,
      blocked: false,
    });
    await service.resetPassword('1', newPassword);
    expect(userAdapter.updateWithReturn).toHaveBeenCalledWith(
      { id: '1' },
      { blocked: false, password: newPassword, failed_attempts: 0 },
    );
  });
});
