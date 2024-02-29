import { Injectable } from '@nestjs/common';
import { EventParticipantAdapter } from 'src/infrastructure/kysely/adapters/event-participant.adapter';
import { EventQueriesAdapter } from 'src/infrastructure/kysely/adapters/event.queries.adapter';
import { ProfileAdapter } from 'src/infrastructure/kysely/adapters/profile.adapter';

@Injectable()
export class BuildProfileService {
  constructor(
    private readonly profileAdapter: ProfileAdapter,
    private readonly eventParticipant: EventParticipantAdapter,
    private readonly eventQueriesAdapter: EventQueriesAdapter,
  ) {}
  async build(profileId: string) {
    const coreProfile = await this.profileAdapter.findWithNbReview(profileId);
    const nbAttendedEvents =
      await this.eventParticipant.getAttendedEventCount(profileId);
    const winningRate = await this.eventParticipant.getWinningRate(profileId);
    const nbBonus =
      await this.eventQueriesAdapter.getNbBonusPerProfile(profileId);

    return { ...coreProfile, ...nbAttendedEvents, ...winningRate, ...nbBonus };
  }
}
