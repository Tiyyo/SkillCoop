import { event as EventModel } from '../../models/index';
import { NotificationHandler } from './core';
import { BuildNotificationMessage } from './message.builder';
import { BuilderEventInfosNotificationMessage, NotificationType, notificationType } from './types';

export class EventInfosHasBeenUpdated extends NotificationHandler {
  declare type: NotificationType;
  declare message?: string;
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
  async getSubscribers(eventId: number): Promise<number[] | null> {
    //TODO : update model method to get subscribers to fit new requirements
    // Subscriber : user invited to the event and have notifications enabled
    //              all user with confirmed participation to the event
    //              exclude organizer
    const subscribersIds = await EventModel.getSubscribers(eventId);
    return subscribersIds ? subscribersIds : null;
  }
  async getInfos(eventId: number) {
    const eventInfos = await EventModel.findByPk(eventId);
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
    const subscribersIds = await this.getSubscribers(this.eventId);
    if (!subscribersIds) return;
    const { eventDate } = await this.getInfos(this.eventId);
    await this.sendNotification(subscribersIds, eventDate);
  }
}

export const notifyEventInfosHasBeenUpdated = async (eventId: number) => {
  const eventInfosHasBeenUpdated = new EventInfosHasBeenUpdated(eventId);
  await eventInfosHasBeenUpdated.notify();
};
