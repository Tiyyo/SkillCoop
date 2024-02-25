import { Injectable } from '@nestjs/common';
import { UserAdapter } from 'src/infrastructure/kysely/adapters/user.adapter';

@Injectable()
export class DeleteUserUsecases {
  constructor(private readonly userAdapter: UserAdapter) { }

  async destroy(userId: string) {
    const hasBeenDeleted = await this.userAdapter.deleteOne({ id: userId });
    // sync with other services here
    return hasBeenDeleted;
  }
}
