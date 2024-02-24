import { vi, describe, beforeEach, it, expect } from 'vitest';
import { CreateSocialUserService } from 'src/domain/services/user/create-social-user.service';
import { UserAdapter } from 'src/infrastructure/kysely/adapters/user.adapter';
import { UserFactory } from 'src/domain/factories/user.factory';
import { Kysely } from 'kysely';
import { DB } from 'src/infrastructure/kysely/database.type';

describe('CreateSocialUserService', () => {
  let service: CreateSocialUserService;
  let userAdapter: UserAdapter;
  let userFactory: UserFactory;
  let dbClient: Kysely<DB>;

  beforeEach(async () => {
    userFactory = new UserFactory();
    userAdapter = new UserAdapter(dbClient);
    service = new CreateSocialUserService(userAdapter, userFactory);
  });

  it('should create a user with a random password and save it', async () => {
    const email = 'test@example.com';
    userAdapter.save = vi.fn().mockResolvedValue({ id: '1', email: email });
    vi.spyOn(userFactory, 'create');
    const user = await service.create(email);

    expect(userAdapter.save).toHaveBeenCalled();
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('email');
    expect(user).toHaveProperty('password');
    expect(user).toHaveProperty('blocked');
    expect(user).toHaveProperty('verified');
    expect(typeof user.id).toBe('string');
    expect(typeof user.email).toBe('string');
    expect(typeof user.password).toBe('string');
  });
});
