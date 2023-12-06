import { notification as NotificationModel } from '../../../models';
import { notificationEventManager } from '../notification-event.manager';
import { NotificationParams, NotificationType } from '../types';

export class NotificationObserver {
  // profileId is an id of a subscriber
  declare type: NotificationType;
  constructor(type: NotificationType) {
    this.type = type;
  }

  async addNotificationToDatabase({
    profileId,
    message,
    type,
    subtype,
    instigatorId,
    img_url,
    eventId,
  }: NotificationParams) {
    await NotificationModel.create({
      profile_id: profileId,
      message,
      subtype,
      type,
      instigator_id: instigatorId ?? null,
      event_id: eventId ?? null,
      img_url: img_url ?? null,
    });
  }
  async triggerEvent(profileId: number) {
    notificationEventManager.new(profileId);
  }
}
