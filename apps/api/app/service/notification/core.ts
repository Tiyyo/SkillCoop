import { notification as NotificationModel } from '../../models';
import { notificationEventManager } from './notification-event.manager';
import { NotificationParams } from './types';

export class NotificationHandler {
  // profileId is an id of a subscriber
  async addNotificationToDatabase({
    profileId,
    message,
    type,
    instigatorId,
    eventId,
  }: NotificationParams) {
    await NotificationModel.create({
      profile_id: profileId,
      message,
      type,
      instigator_id: instigatorId ?? null,
      event_id: eventId ?? null,
    });
  }
  async triggerEvent(profileId: number) {
    notificationEventManager.new(profileId);
  }
}
