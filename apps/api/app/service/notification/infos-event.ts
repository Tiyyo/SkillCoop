import { event as EventModel } from '../../models/index';
import { NotificationHandler } from './core';
import { BuildNotificationMessage } from './message.builder';
import { BuilderEventInfosNotificationMessage, NotificationType, notificationType } from './types';

export class EventInfosHasBeenUpdated extends NotificationHandler {
  declare type: NotificationType;
  declare builder: BuilderEventInfosNotificationMessage;
  declare eventId: number;
  constructor(eventId: number) {
    super();
    this.type = notificationType.eventInfosHasBeenUpdated;
    const builder = new BuildNotificationMessage(this.type);
    // TODO : find a way to infer correct type to builder and remove cast
    this.builder = builder.getBuilder(this.type) as BuilderEventInfosNotificationMessage;
    this.eventId = eventId;
  }
  async getSubscribers(): Promise<number[] | null> {
    const subscribersIds = await EventModel.getSubscribers(this.eventId);
    return subscribersIds ? subscribersIds : null;
  }
  async getInfos() {
    const eventInfos = await EventModel.findByPk(this.eventId);
    return { eventDate: eventInfos.date };
  }
  async sendNotification(subscribers?: number[], eventDate?: string) {
    if (!subscribers || !eventDate || !this.builder) return;
    subscribers.forEach((id) => {
      const message = this.builder(eventDate);
      this.addNotificationToDatabase({ profileId: id, message, type: this.type });
      this.triggerEvent(id);
    });
  }
  async notify() {
    const subscribersIds = await this.getSubscribers();
    const { eventDate } = await this.getInfos();
    if (!subscribersIds) return;
    await this.sendNotification(subscribersIds, eventDate);
  }
}

export const notifyEventInfosHasBeenUpdated = async (eventId: number) => {
  const eventInfosHasBeenUpdated = new EventInfosHasBeenUpdated(eventId);
  await eventInfosHasBeenUpdated.notify();
};
