import { NotificationObserver } from './core';
import { event as EventModel, profile as Profile } from '../../../models/index';
import { BuildNotificationMessage } from '../message.builder';
import type {
  BuilderUserInvitedToEventNotificationMessage,
  NotificationSubtype,
  NotificationType,
} from 'skillcoop-types';
import { notificationSubtype, notificationType } from 'skillcoop-types';


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
    this.builder = builder.getBuilder(this.subtype) as BuilderUserInvitedToEventNotificationMessage;
  }
  async getSubscribers(): Promise<number[] | null> {
    // This is bad
    const invitedIds = this.invitedIds;

    // Determine which invited users have active_notification set to 1
    // Extract that logic into a function and use it in other places
    const profileInfosInvitedUserQuery = invitedIds.map((id) => Profile.findByPk(id));
    const profileInfos = await Promise.allSettled(profileInfosInvitedUserQuery);
    // filterMap with reduce
    const subscribersIds = profileInfos.reduce((acc: number[], curr: any) => {
      if (curr.status === 'fulfilled' && curr.value.active_notification === 1) {
        acc.push(curr.value.id);
      }
      return acc;
    }, []);
    return subscribersIds.length > 0 ? subscribersIds : null;
  }
  async getEventInfos() {
    const eventInfos = await EventModel.findByPk(this.eventId);
    return { eventDate: eventInfos.date };
  }
  async getInstigatorUsername(): Promise<{ username: string; avatar_url: string }> {
    const { username, avatar_url } = await Profile.findByPk(this.instigatorId);
    return { username, avatar_url };
  }
  async sendNotification({ subscribers, eventDate, username, avatar_url }: SendNotificationProps) {
    if (!subscribers || !eventDate || !this.builder) return;
    const message = this.builder(username, eventDate);
    subscribers.forEach((id) => {
      this.addNotificationToDatabase({
        profileId: id,
        message,
        type: this.type,
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
    await this.sendNotification({ subscribers, eventDate, username, avatar_url });
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
