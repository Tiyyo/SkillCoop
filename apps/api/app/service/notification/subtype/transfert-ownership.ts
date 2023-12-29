import { hasActiveNotification } from '../../../utils/has-active-notification';
import { BuildNotificationMessage } from '../message.builder';
import { event as EventModel, profile as Profile } from '../../../models/index';
import type {
  BuilderTransfertOwnershipMessage,
  NotificationSubtype,
  NotificationType,
} from 'skillcoop-types';
import { notificationSubtype, notificationType } from 'skillcoop-types';
import { NotificationObserver } from './core';

type ConstructorProps = {
  eventId: number;
  instigatorId: number;
  subscriberId: number;
  type: NotificationType;
};

type SendNotificationProps = {
  subscriber: number[] | null;
  eventDate: string;
  username: string;
  avatar_url?: string | null;
};

class TransfertOwnership extends NotificationObserver {
  declare subtype: NotificationSubtype;

  declare instigatorId: number;

  declare subscriberId: number;

  declare eventId: number;

  declare builder: BuilderTransfertOwnershipMessage;

  constructor({ eventId, instigatorId, type, subscriberId }: ConstructorProps) {
    super(type);
    this.subtype = notificationSubtype.transfertOwnership;
    this.instigatorId = instigatorId;
    this.subscriberId = subscriberId;
    this.eventId = eventId;
    const builder = new BuildNotificationMessage(this.subtype);
    // TODO : find a way to infer correct type to builder and remove cast
    this.builder = builder.getBuilder(
      this.subtype,
    ) as BuilderTransfertOwnershipMessage;
  }
  async getSubscribers(): Promise<number[] | null> {
    const haveSubscribed = await hasActiveNotification([this.subscriberId]);
    return haveSubscribed;
  }
  async getEventInfos() {
    const eventInfos = await EventModel.findByPk(this.eventId);
    return { eventDate: eventInfos.date };
  }
  async getInstigatorInfos() {
    const { username, avatar_url } = await Profile.findByPk(this.instigatorId);
    return { username, avatar_url };
  }
  async sendNotification({
    subscriber,
    username,
    eventDate,
    avatar_url,
  }: SendNotificationProps) {
    if (!subscriber) return null;
    const message = this.builder(username, eventDate);
    subscriber.forEach((id) => {
      this.addNotificationToDatabase({
        profileId: id,
        message,
        type: this.type,
        subtype: this.subtype,
        eventId: this.eventId,
        instigatorId: this.instigatorId,
        img_url: avatar_url,
      });
      this.triggerEvent(id);
    });
    return null;
  }
  async notify() {
    const subscriber = await this.getSubscribers();
    if (!subscriber) return null;
    const { username, avatar_url } = await this.getInstigatorInfos();
    const { eventDate } = await this.getEventInfos();
    await this.sendNotification({
      subscriber,
      username,
      eventDate,
      avatar_url,
    });
  }
}

export const notifyTransfertOwnership = async (
  eventId: number,
  instigatorId: number,
  subscriberId: number,
) => {
  const transfertOwnership = new TransfertOwnership({
    type: notificationType.event,
    eventId,
    instigatorId,
    subscriberId,
  });
  await transfertOwnership.notify();
};
