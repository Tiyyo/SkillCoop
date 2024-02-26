import { Inject, Injectable } from '@nestjs/common';
import { EmitEventInterface } from 'src/application/services/event.service';
import { UserAdapter } from 'src/infrastructure/kysely/adapters/user.adapter';

@Injectable()
export class DeleteUserUsecases {
  constructor(
    private readonly userAdapter: UserAdapter,
    @Inject('EmitEventService') private eventEmitter: EmitEventInterface,
  ) { }

  async destroy(userId: string) {
    const hasBeenDeleted = await this.userAdapter.deleteOne({ id: userId });
    this.eventEmitter.userDeleted({ profileId: userId });
    return hasBeenDeleted;
  }
}
