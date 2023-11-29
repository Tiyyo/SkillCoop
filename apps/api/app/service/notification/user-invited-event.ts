import { NotificationHandler } from './core';
import { event as EventModel, profile as Profile } from '../../models/index';
import { BuildNotificationMessage } from './message.builder';
import {
  BuilderUserInvitedToEventNotificationMessage,
  NotificationType,
  notificationType,
} from './types';

class UserHasBeenInvited extends NotificationHandler {
  declare eventId: number;
  declare instigatorId: number;
  declare invitedIds: number[];
  declare type: NotificationType;
  declare builder: BuilderUserInvitedToEventNotificationMessage;
  constructor(eventId: number, instigatorId: number, invitedIds: number[]) {
    super();
    this.eventId = eventId;
    this.instigatorId = instigatorId;
    this.invitedIds = invitedIds;
    this.type = notificationType.userHasBeenInvitedToEvent;
    const builder = new BuildNotificationMessage(this.type);
    // TODO : find a way to infer correct type to builder and remove cast
    this.builder = builder.getBuilder(this.type) as BuilderUserInvitedToEventNotificationMessage;
  }
  async getSubscribers(): Promise<number[] | null> {
    // This is bad
    const invitedIds = this.invitedIds;
    const isSubscribedQuery = invitedIds.map((id) => Profile.findByPk(id));
    const isSubscribed = await Promise.allSettled(isSubscribedQuery);
    // filteMap with reduce
    const subscribersIds = isSubscribed.reduce((acc: number[], curr: any) => {
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
  async getInstigatorUsername(): Promise<string> {
    const { username } = await Profile.findByPk(this.instigatorId);
    return username;
  }
  async sendNotification(subscribers: number[], eventDate: string, username: string) {
    if (!subscribers || !eventDate || !this.builder) return;
    subscribers.forEach((id) => {
      const message = this.builder(username, eventDate);
      this.addNotificationToDatabase({ profileId: id, message, type: this.type });
      this.triggerEvent(id);
    });
  }
  async notify() {
    const subscribers = await this.getSubscribers();
    if (!subscribers) return;
    const { eventDate } = await this.getEventInfos();
    const username = await this.getInstigatorUsername();
    await this.sendNotification(subscribers, eventDate, username);
  }
}

export const notifyUserHasBeenInvitedToEvent = async (
  eventId: number,
  instigatorId: number,
  subscribersIds: number[],
) => {
  const userHasBeenInvited = new UserHasBeenInvited(eventId, instigatorId, subscribersIds);
  await userHasBeenInvited.notify();
};
