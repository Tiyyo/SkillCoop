import { vi, describe, beforeEach, it, expect } from 'vitest';
import { CreateSocialUserService } from 'src/domain/services/user/create-social-user.service';
import { UserAdapter } from 'src/infrastructure/kysely/adapters/user.adapter';
import { UserFactory } from 'src/domain/factories/user.factory';
import { Test, TestingModule } from '@nestjs/testing';
import { EventEmitterService } from 'src/infrastructure/service/event.emitter.service';
import { EmitEventInterface } from 'src/application/services/event.service';
import mockDatabaseProvider from 'src/infrastructure/kysely/mock.client';

describe('CreateSocialUserService', () => {
  let service: CreateSocialUserService;
  let userAdapter: UserAdapter;
  let userFactory: UserFactory;
  let eventEmitterService: EmitEventInterface;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateSocialUserService,
        UserAdapter,
        UserFactory,
        mockDatabaseProvider,
        { provide: 'EmitEventService', useClass: EventEmitterService },
      ],
    }).compile();

    userAdapter = module.get<UserAdapter>(UserAdapter);
    userFactory = module.get<UserFactory>(UserFactory);
    eventEmitterService = module.get<EmitEventInterface>('EmitEventService');
    service = module.get<CreateSocialUserService>(CreateSocialUserService);
  });

  it.skip('should create a user with a random password and save it', async () => {
    const email = 'test@example.com';
    userAdapter.save = vi.fn().mockResolvedValue({ id: '1', email: email });
    eventEmitterService.userCreated = vi.fn().mockResolvedValue(true);
    vi.spyOn(userFactory, 'create');
    vi.spyOn(eventEmitterService, 'userCreated');
    const user = await service.create(email);

    expect(userAdapter.save).toHaveBeenCalled();
    expect(eventEmitterService.userCreated).toHaveBeenCalled();
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
