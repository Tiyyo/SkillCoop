import { Injectable } from '@nestjs/common';
import { UserQueueDto } from './user-queue.dto';
import { UserSyncService } from 'src/data-sync/user-sync.service';

@Injectable()
export class UserQueueDispatcher {
  constructor(private userSyncService: UserSyncService) { }

  async dispatch(data: UserQueueDto) {
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
