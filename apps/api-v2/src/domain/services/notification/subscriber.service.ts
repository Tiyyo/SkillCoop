import { Injectable } from '@nestjs/common';
import { EventParticipantAdapter } from 'src/infrastructure/kysely/adapters/event-participant.adapter';
import { UserTransportNotificationService } from './user-transport-notification.service';

type UserTransports = {
  profileId: string;
  transports: string[];
};

@Injectable()
export class SubscriberService {
  constructor(
    private readonly eventParticipantAdapter: EventParticipantAdapter,
    private readonly userTransportService: UserTransportNotificationService,
  ) { }
  async get({
    type,
    profileId,
    eventId,
    convId,
  }: {
    type: string;
    profileId: string | undefined;
    eventId: number | undefined;
    convId: number | undefined;
  }): Promise<UserTransports[]> | null {
    switch (type) {
      case 'event':
        return await this.getEventSubscriber(eventId, type);
      case 'friend':
        return await this.getFriendSubscriber(profileId, type);
      case 'message':
        return await this.getMessagesSubscriber(convId, type);
      case 'system':
        return await this.getSystemSubscriber(type);
      default:
        break;
    }
  }
  private async getEventSubscriber(
    eventId: number,
    notificationType: string,
  ): Promise<UserTransports[]> | null {
    // fetch ids from event participants where participant are confirmed or invited
    // in this particular event
    const ids =
      await this.eventParticipantAdapter.getEventParticipantsIds(eventId);
    // then we need to get their notification preference
    return this.userTransportService.get(ids, notificationType);
  }
  private async getFriendSubscriber(
    profileId: string,
    notificationType: string,
  ): Promise<UserTransports[]> | null {
    const ids = [profileId];
    return this.userTransportService.get(ids, notificationType);
  }
  private async getMessagesSubscriber(
    convId: number,
    notificationType: string,
  ): Promise<UserTransports[]> | null {
    // we need to get all the participants of the conversation
    const ids = ['1'];
    console.log('ids get messages subscribers', ids, convId, notificationType);
    return [{ profileId: '1', transports: ['email', 'website'] }];
  }
  private async getSystemSubscriber(
    notificationType: string,
  ): Promise<UserTransports[]> {
    // we need to get all the users
    const ids = ['1'];
    console.log('ids get system subscribers', ids, notificationType);
    return [{ profileId: '1', transports: ['email'] }];
  }
}
