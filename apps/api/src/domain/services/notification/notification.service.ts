import { Injectable } from '@nestjs/common';
import { NotificationAdapter } from 'src/infrastructure/kysely/adapters/notification.adapter';

@Injectable()
export class NotificationService {
  constructor(private readonly notificationAdapter: NotificationAdapter) {}
  async save({
    message,
    notificationType,
    subtype,
    profileId,
    instigatorId,
    eventId,
    avatarUrl,
  }: {
    message: string;
    notificationType: string;
    subtype: string;
    profileId: string;
    instigatorId: string;
    eventId?: number;
    avatarUrl?: string | null;
  }) {
    return await this.notificationAdapter.createOne({
      message,
      type_name: notificationType,
      subtype,
      profile_id: profileId,
      instigator_id: instigatorId,
      event_id: eventId,
      img_url: avatarUrl,
    });
  }
}
