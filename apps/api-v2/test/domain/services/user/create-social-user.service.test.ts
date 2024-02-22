import { Test } from '@nestjs/testing';
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
    // const moduleRef = await Test.createTestingModule({
    //   providers: [
    //     CreateSocialUserService,
    //     {
    //       provide: UserAdapter,
    //       useValue: {
    //         save: vi
    //           .fn()
    //           .mockResolvedValue({ id: '1', email: 'test@example.com' }),
    //       },
    //     },
    //     UserFactory,
    //   ],
    // }).compile();

    // service = moduleRef.get<CreateSocialUserService>(CreateSocialUserService);
    // userAdapter = moduleRef.get<UserAdapter>(UserAdapter);
    // userFactory = moduleRef.get<UserFactory>(UserFactory);

    userFactory = new UserFactory();
    userAdapter = new UserAdapter(dbClient);
    service = new CreateSocialUserService(userAdapter, userFactory);
  });

  it('should create a user with a random password and save it', async () => {
    const email = 'test@example.com';
    const password = await service.create(email);
    vi.spyOn(userFactory, 'create');
    userAdapter.save = vi.fn().mockResolvedValue({ id: '1', email: email });

    // expect(userFactory.create).toHaveBeenCalledWith(email, expect.any(String));
    expect(userAdapter.save).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: expect.any(String),
    });
    expect(typeof password).toBe('string');
  });
  // it('should return the created user with string id, email', async () => {
  //   const email = 'test@example.com';
  //   const user = await service.create(email);

  //   expect(user).toHaveProperty('id');
  //   expect(user).toHaveProperty('email');
  //   expect(user.id).toBe(typeof 'string');
  // });
});
