import { Injectable } from '@nestjs/common';
import { NotificationReadManagerService } from 'src/domain/services/notification/notification-manager.service';
import { NotificationAdapter } from 'src/infrastructure/kysely/adapters/notification.adapter';

@Injectable()
export class NotificationUsecases {
  constructor(
    private readonly notificationAdapter: NotificationAdapter,
    private readonly notificationManager: NotificationReadManagerService,
  ) {}
  async getLast(profileId: string) {
    return await this.notificationAdapter.getLast(profileId);
  }

  async markAsRead(notificationId: number) {
    return await this.notificationManager.markAsRead(notificationId);
  }
}
