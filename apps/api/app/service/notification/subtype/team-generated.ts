import {
  notificationSubtype,
  notificationType,
} from 'skillcoop-types';
import { profileOnEvent as Participant, event as EventModel } from '../../../models/index';
import { NotificationObserver } from './core';
import { hasActiveNotification } from '../../../utils/has-active-notification';
import { BuildNotificationMessage } from '../message.builder';
import type {
  EventParticipant, BuildTeamsHasBeenGeneratedMessage,
  NotificationSubtype,
  NotificationType,
} from 'skillcoop-types';

class TeamHasBeenGenerated extends NotificationObserver {
  declare subtype: NotificationSubtype;

  declare eventId: number;

  declare builder: BuildTeamsHasBeenGeneratedMessage;

  constructor(type: NotificationType, eventId: number) {
    super(type);
    this.subtype = notificationSubtype.teamHasBeenGenerated;
    this.eventId = eventId;
    // Kinda obscur , consider to refactor and clean
    const builder = new BuildNotificationMessage(this.subtype);
    this.builder = builder.getBuilder(this.subtype) as BuildTeamsHasBeenGeneratedMessage;
  }
  async getSubscribers() {
    const confirmedParticipants = await Participant.findBy({
      event_id: this.eventId,
      status_name: 'confirmed',
    });
    if (!confirmedParticipants) return null;
    const participantsIds = confirmedParticipants.map(
      (participant: EventParticipant) => participant.profile_id,
    );
    const subscribersIds = await hasActiveNotification(participantsIds);
    return subscribersIds;
  }
  async getInfos() {
    const eventInfos = await EventModel.findByPk(this.eventId);
    return { eventDate: eventInfos.date };
  }
  async sendNotification(subscribers: number[], eventDate: string) {
    if (!subscribers || !eventDate || !this.builder) return;
    const message = this.builder(eventDate);
    subscribers.forEach((id) => {
      this.addNotificationToDatabase({
        profileId: id,
        message,
        type: this.type,
        subtype: this.subtype,
        eventId: this.eventId,
      });
      this.triggerEvent(id);
    });
  }
  async notify() {
    const subscribersIds = await this.getSubscribers();
    if (!subscribersIds) return;
    const { eventDate } = await this.getInfos();
    await this.sendNotification(subscribersIds, eventDate);
  }
}

export const notifyTeamHasBeenGenerated = async (eventId: number) => {
  const teamHasBeenGenerated = new TeamHasBeenGenerated(notificationType.event, eventId);
  await teamHasBeenGenerated.notify();
};
