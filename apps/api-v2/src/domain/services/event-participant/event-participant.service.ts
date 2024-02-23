import { Injectable } from '@nestjs/common';
import { EventParticipantAdapter } from 'src/infrastructure/kysely/adapters/event-participant.adapter';

@Injectable()
export class EventParticipantService {
  constructor(
    private readonly eventParticipantAdapter: EventParticipantAdapter,
  ) { }
  async updateStatusToRequested(eventId: number, profileId: string) {
    return this.eventParticipantAdapter.upsert({
      status_name: 'requested',
      event_id: eventId,
      profile_id: profileId,
    });
  }
}
