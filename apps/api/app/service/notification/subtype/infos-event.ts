import {
  event as EventModel,
  profile as Profile,
} from '../../../models/index.js';
import { NotificationObserver } from './core.js';
import { BuildNotificationMessage } from '../message.builder.js';
import type {
  BuilderEventInfosNotificationMessage,
  NotificationSubtype,
  NotificationType,
} from '@skillcoop/types';
import { notificationSubtype, notificationType } from '@skillcoop/types';
import NotFoundError from '../../../helpers/errors/not-found.error.js';

export class EventInfosHasBeenUpdated extends NotificationObserver {
  declare subtype: NotificationSubtype;
  declare builder: BuilderEventInfosNotificationMessage;
  declare eventId: number;
  constructor(type: NotificationType, eventId: number) {
    super(type);
    this.subtype = notificationSubtype.eventInfosHasBeenUpdated;
    const builder = new BuildNotificationMessage(this.subtype);
    // TODO : find a way to infer correct type to builder and remove cast
    this.builder = builder.getBuilder(
      this.subtype,
    ) as BuilderEventInfosNotificationMessage;
    this.eventId = eventId;
  }
  async getSubscribers(): Promise<number[] | null> {
    const subscribersIds = await EventModel.getSubscribers(this.eventId);
    return subscribersIds ? subscribersIds : null;
  }
  async getInfos() {
    const eventInfos = await EventModel.findOne({ id: this.eventId });
    if (!eventInfos || !eventInfos.organizer_id)
      throw new NotFoundError('Event not found');
    const profile = await Profile.findOne({
      profile_id: eventInfos.organizer_id,
    });
    if (!profile) throw new NotFoundError('Profile not found');
    return { eventDate: eventInfos.date, avatar_url: profile.avatar_url };
  }
  async sendNotification(
    subscribers?: number[],
    eventDate?: string,
    img_url?: string | null,
  ) {
    if (!subscribers || !eventDate || !this.builder) return;
    subscribers.forEach((id) => {
      const message = this.builder(eventDate);
      this.addNotificationToDatabase({
        profileId: id,
        message,
        type_name: this.type,
        subtype: this.subtype,
        img_url,
        eventId: this.eventId,
      });
      this.triggerEvent(id);
    });
  }
  async notify() {
    const subscribersIds = await this.getSubscribers();
    const { eventDate, avatar_url } = await this.getInfos();
    if (!subscribersIds) return;
    await this.sendNotification(subscribersIds, eventDate, avatar_url);
  }
}

export const notifyEventInfosHasBeenUpdated = async (eventId: number) => {
  const eventInfosHasBeenUpdated = new EventInfosHasBeenUpdated(
    notificationType.event,
    eventId,
  );
  await eventInfosHasBeenUpdated.notify();
};
