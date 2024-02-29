import { Injectable } from '@nestjs/common';
import { ApplicationException } from 'src/application/exceptions/application.exception';
import { RessourceNotFoundException } from 'src/application/exceptions/ressource-not-found.exception';
import { WrongEventStatusException } from 'src/application/exceptions/wront-event-status.exception';
import { BestStrikerAdapter } from 'src/infrastructure/kysely/adapters/best-striker.adapter';
import { EventMutationsAdapter } from 'src/infrastructure/kysely/adapters/event.mutations.adapter';
import { EventQueriesAdapter } from 'src/infrastructure/kysely/adapters/event.queries.adapter';
import { MvpAdapter } from 'src/infrastructure/kysely/adapters/mvp.adapter';

@Injectable()
export class AwardUseCases {
  constructor(
    private readonly eventQueriesAdapter: EventQueriesAdapter,
    private readonly eventMutationsAdapter: EventMutationsAdapter,
    private readonly bestStrikerAdapter: BestStrikerAdapter,
    private readonly mvpAdapter: MvpAdapter,
  ) {}

  async voteForBestStriker(
    eventId: number,
    profileId: string,
    raterId: string,
  ) {
    const event = await this.eventQueriesAdapter.getOneEvent(
      eventId,
      profileId,
    );
    if (!event) {
      throw new ApplicationException('Event not found', 'AwardUseCases');
    }
    if (event.status_name !== 'completed') {
      throw new WrongEventStatusException(
        'Event status not equal to completed',
        'AwardUseCases',
      );
    }
    await this.bestStrikerAdapter.createOne({
      event_id: eventId,
      profile_id: profileId,
      rater_id: raterId,
    });

    await this.eventMutationsAdapter.updateBestStriker(eventId);
    return { message: 'success' };
  }
  async voteForMvp(eventId: number, profileId: string, raterId: string) {
    const event = await this.eventQueriesAdapter.getOneEvent(
      eventId,
      profileId,
    );
    if (!event) {
      throw new RessourceNotFoundException('Event not found', 'AwardUseCases');
    }
    if (event.status_name !== 'completed') {
      throw new WrongEventStatusException(
        'Event status not equal to completed',
        'AwardUseCases',
      );
    }

    await this.mvpAdapter.createOne({
      event_id: eventId,
      profile_id: profileId,
      rater_id: raterId,
    });

    await this.eventMutationsAdapter.updateMvp(eventId);
    return { message: 'success' };
  }
}
