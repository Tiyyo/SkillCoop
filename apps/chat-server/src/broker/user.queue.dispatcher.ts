import { Injectable } from '@nestjs/common';
import { UserSyncService } from 'src/data-sync/user-sync.service';
import { UserQueuePublisher } from '@skillcoop/types';

@Injectable()
export class UserQueueDispatcher {
  constructor(private userSyncService: UserSyncService) { }

  async dispatch(data: UserQueuePublisher) {
    switch (data.action) {
      case 'create':
        return this.userSyncService.create(data);
      case 'update':
        return this.userSyncService.update(data);
      case 'delete':
        return this.userSyncService.delete(data);
    }
  }
}
