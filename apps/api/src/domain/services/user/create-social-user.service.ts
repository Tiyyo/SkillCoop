import { UserAdapter } from 'src/infrastructure/kysely/adapters/user.adapter';
import { UserFactory } from '../../factories/user.factory';
import * as randomBytes from 'randombytes';
import { Inject, Injectable } from '@nestjs/common';
import { EmitEventInterface } from 'src/application/services/event.service';

@Injectable()
export class CreateSocialUserService {
  constructor(
    private readonly userAdapter: UserAdapter,
    private readonly userFactory: UserFactory,
    @Inject('EmitEventService') private userEmitter: EmitEventInterface,
  ) {}
  async create(email: string) {
    const password = randomBytes(16).toString('hex');
    const user = this.userFactory.create(email, password);
    await this.userAdapter.save(user);
    this.userEmitter.userCreated({
      profileId: user.id,
    });
    return user;
  }
}
