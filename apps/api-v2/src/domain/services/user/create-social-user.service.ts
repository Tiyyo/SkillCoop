import { UserAdapter } from 'src/infrastructure/kysely/adapters/user.adapter';
import { UserFactory } from '../../factories/user.factory';
import randomBytes from 'randombytes';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateSocialUserSerice {
  constructor(
    private readonly userAdapter: UserAdapter,
    private readonly userFactory: UserFactory,
  ) { }
  async create(email: string) {
    const password = randomBytes(16).toString('hex');
    const user = this.userFactory.create(email, password);
    await this.userAdapter.save(user);
    return user;
  }
}
