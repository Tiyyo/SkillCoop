import { Injectable } from '@nestjs/common';
import { NotificationAdapter } from 'src/infrastructure/kysely/adapters/notification.adapter';

@Injectable()
export class NotificationReadManagerService {
  constructor(private readonly notificationAdapter: NotificationAdapter) { }

  async markAsRead(notificationId: number) {
    await this.notificationAdapter.updateOne(
      {
        id: notificationId,
      },
      { is_read: true as unknown as number },
    );
  }
}
