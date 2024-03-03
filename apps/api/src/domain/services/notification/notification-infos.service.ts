import { Injectable } from '@nestjs/common';
import { ApplicationException } from 'src/application/exceptions/application.exception';
import { EventQueriesAdapter } from 'src/infrastructure/kysely/adapters/event.queries.adapter';
import { ProfileAdapter } from 'src/infrastructure/kysely/adapters/profile.adapter';
import { NotificationSubtype } from 'src/domain/entities/notification.entity';

export class EventInfos {
  avatar_url: string | null;
  organizerId: string;
  eventDate: string;

  constructor(
    avatar_url: string | null,
    organizerId: string,
    eventDate: string,
  ) {
    this.avatar_url = avatar_url;
    this.organizerId = organizerId;
    this.eventDate = eventDate;
  }

  get get() {
    return this;
  }
}

export class InstigatorInfos {
  avatar_url: string | null;
  username: string;

  constructor(avatar_url: string | null, username: string) {
    this.avatar_url = avatar_url;
    this.username = username;
  }
  get get() {
    return this;
  }
}

@Injectable()
export class InfosNotificationService {
  constructor(
    private readonly profileAdapter: ProfileAdapter,
    private readonly eventQueriesAdapter: EventQueriesAdapter,
  ) { }
  async get({
    type,
    eventId,
    instigatorId,
    subtype,
  }: {
    type: string;
    instigatorId: string;
    eventId?: number;
    subtype: NotificationSubtype;
  }) {
    if (subtype === 'userHasBeenInvitedToEvent') {
      return await this.getInstigatorInfos(instigatorId);
    }
    if (type === 'event') {
      return await this.getEventInfos(eventId);
    }
    if (type === 'friend') {
      return await this.getInstigatorInfos(instigatorId);
    }
    throw new ApplicationException(
      'Notification Type not implemented',
      'InfosNotificationService',
    );
  }
  async getInstigatorInfos(
    profileId: string,
  ): Promise<{ avatar_url: string | null; username: string }> {
    const profile = await this.profileAdapter.findOne({
      profile_id: profileId,
    });
    return new InstigatorInfos(profile?.avatar_url, profile?.username).get;
  }
  async getEventInfos(eventId: number): Promise<{
    avatar_url: string | null;
    organizerId: string;
    eventDate: string;
  }> {
    const { organizer_id, date: eventDate } =
      await this.eventQueriesAdapter.findOne({ id: eventId });

    const profile = await this.profileAdapter.findOne({
      profile_id: organizer_id,
    });
    return new EventInfos(profile?.avatar_url, organizer_id, eventDate).get;
  }
}
