import { Injectable } from '@nestjs/common';
import { SubscriberService } from './subscriber.service';
import {
  EventInfos,
  InfosNotificationService,
  InstigatorInfos,
} from './notification-infos.service';
import { NotificationBuilderMessageService } from './notification-builder-message.service';
import { NotificationService } from './notification.service';
import { NotificationDispatchService } from './notification-dispatch.service';

export type NotificationSubtype =
  | 'eventInfosHasBeenUpdated'
  | 'userHasBeenInvitedToEvent'
  | 'userReceivedFriendRequest'
  | 'userHasBeenAddedToFriendlist'
  | 'teamHasBeenGenerated'
  | 'transfertOwnership';

@Injectable()
export class NotificationPipelineService {
  constructor(
    private readonly subscriberService: SubscriberService,
    private readonly infosNotificationService: InfosNotificationService,
    private readonly notificationBuilderMessageService: NotificationBuilderMessageService,
    private readonly notificationService: NotificationService,
    private readonly notificationDispatchService: NotificationDispatchService,
  ) { }
  async notify({
    type,
    subtype,
    eventId,
    instigatorId,
    profileId,
    convId,
  }: {
    type: string;
    subtype: NotificationSubtype;
    eventId?: number;
    instigatorId?: string;
    profileId?: string;
    convId?: number;
  }) {
    const subscribers = await this.subscriberService.get({
      type: type,
      eventId: eventId,
      convId: convId,
      profileId: profileId,
    });
    console.log('Subscriber', subscribers);
    const infos = await this.infosNotificationService.get({
      type: type,
      eventId: eventId,
      instigatorId: instigatorId,
      subtype: subtype,
    });
    console.log('Infos', infos);
    const message = this.notificationBuilderMessageService.build({
      subtype: subtype,
      username: infos instanceof InstigatorInfos ? infos.username : undefined,
      eventDate: infos instanceof EventInfos ? infos.eventDate : undefined,
    });
    console.log('Message', message);
    const notifications = subscribers
      .filter((subscriber) => {
        if (instigatorId) {
          return subscriber.profileId !== instigatorId;
        }
        return true;
      })
      .map((subscriber) => {
        return {
          ...subscriber,
          subtype: subtype,
          message,
          notificationType: type,
          instigatorId: instigatorId,
          eventId: eventId,
          avatarUrl: infos instanceof InstigatorInfos ? infos.avatar_url : null,
        };
      });
    console.log('Notifications', notifications);
    if (!notifications || notifications.length === 0) {
      return;
    }
    notifications.forEach(async (notification) => {
      if (
        notification.transports.includes('website') ||
        notification.transports.includes('push')
      ) {
        console.log('Saved notification', notification);
        await this.notificationService.save(notification);
      }
      console.log('Dispatech', notification);
      return this.notificationDispatchService.dispatch(notification);
    });
  }
}
