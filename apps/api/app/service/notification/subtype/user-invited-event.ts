import { NotificationObserver } from './core';
import { event as EventModel, profile as Profile } from '../../../models/index';
import { BuildNotificationMessage } from '../message.builder';
import type {
  BuilderUserInvitedToEventNotificationMessage,
  NotificationSubtype,
  NotificationType,
} from 'skillcoop-types';
import { notificationSubtype, notificationType } from 'skillcoop-types';
import { hasActiveNotification } from '../../../utils/has-active-notification';

type ConstructorProps = {
  eventId: number;
  instigatorId: number;
  invitedIds: number[];
  type: NotificationType;
};

type SendNotificationProps = {
  subscribers: number[];
  eventDate: string;
  username: string;
  avatar_url?: string | null;
};

class UserHasBeenInvited extends NotificationObserver {
  declare eventId: number;

  declare instigatorId: number;

  declare invitedIds: number[];

  declare subtype: NotificationSubtype;

  declare builder: BuilderUserInvitedToEventNotificationMessage;

  constructor({ eventId, instigatorId, invitedIds, type }: ConstructorProps) {
    super(type);
    this.eventId = eventId;
    this.instigatorId = instigatorId;
    this.invitedIds = invitedIds;
    this.subtype = notificationSubtype.userHasBeenInvitedToEvent;
    const builder = new BuildNotificationMessage(this.subtype);
    // TODO : find a way to infer correct type to builder and remove cast
    this.builder = builder.getBuilder(
      this.subtype,
    ) as BuilderUserInvitedToEventNotificationMessage;
  }
  async getSubscribers(): Promise<number[] | null> {
    const invitedIds = this.invitedIds;
    return hasActiveNotification(invitedIds);
  }
  async getEventInfos() {
    const eventInfos = await EventModel.findOne({ id: this.eventId });
    return { eventDate: eventInfos.date };
  }
  async getInstigatorUsername(): Promise<{
    username: string;
    avatar_url: string;
  }> {
    const { username, avatar_url } = await Profile.findOne({
      id: this.instigatorId,
    });
    if (!username || !avatar_url) throw new Error('Instigator not found');
    return { username, avatar_url };
  }
  async sendNotification({
    subscribers,
    eventDate,
    username,
    avatar_url,
  }: SendNotificationProps) {
    if (!subscribers || !eventDate || !this.builder) return;
    const message = this.builder(username, eventDate);
    subscribers.forEach((id) => {
      this.addNotificationToDatabase({
        profileId: id,
        message,
        type_name: this.type,
        eventId: this.eventId,
        instigatorId: this.instigatorId,
        subtype: this.subtype,
        img_url: avatar_url,
      });
      this.triggerEvent(id);
    });
  }
  async notify() {
    const subscribers = await this.getSubscribers();
    if (!subscribers) return;
    const { eventDate } = await this.getEventInfos();
    const { username, avatar_url } = await this.getInstigatorUsername();
    await this.sendNotification({
      subscribers,
      eventDate,
      username,
      avatar_url,
    });
  }
}

export const notifyUserHasBeenInvitedToEvent = async (
  eventId: number,
  instigatorId: number,
  subscribersIds: number[],
) => {
  const userHasBeenInvited = new UserHasBeenInvited({
    eventId,
    instigatorId,
    invitedIds: subscribersIds,
    type: notificationType.event,
  });
  await userHasBeenInvited.notify();
};
