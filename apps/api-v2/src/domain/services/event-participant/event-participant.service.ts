import { Injectable } from '@nestjs/common';
import { EventParticipantAdapter } from 'src/infrastructure/kysely/adapters/event-participant.adapter';

@Injectable()
export class EventParticipantService {
  constructor(
    private readonly eventParticipantAdapter: EventParticipantAdapter,
  ) { }
  // Should be only used ath the moment of creating an event
  async addParticipant(eventId: number, profileId: string) {
    return this.eventParticipantAdapter.createOne({
      status_name: 'confirmed',
      event_id: eventId,
      profile_id: profileId,
    });
  }
  async inviteParticipant(eventId: number, profileIds: string[]) {
    if (!profileIds || profileIds.length === 0) return;

    const participantsToInvite = profileIds.map((id: string) => {
      return {
        profile_id: id,
        event_id: eventId,
        status_name: 'pending',
      };
    });
    return this.eventParticipantAdapter.createMany(participantsToInvite);
  }
  async updateStatusToRequested(eventId: number, profileId: string) {
    return this.eventParticipantAdapter.upsert({
      status_name: 'requested',
      event_id: eventId,
      profile_id: profileId,
    });
  }
}
