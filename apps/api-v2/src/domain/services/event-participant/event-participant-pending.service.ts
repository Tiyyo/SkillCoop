import { Injectable } from '@nestjs/common';
import { EventCoreEntity } from 'src/domain/entities/event.entity';
import { EventParticipantAdapter } from 'src/infrastructure/kysely/adapters/event-participant.adapter';
import { EventMutationsAdapter } from 'src/infrastructure/kysely/adapters/event.mutations.adapter';

@Injectable()
export class EventParticipantPendingService {
  constructor(
    private readonly eventParticipantAdapter: EventParticipantAdapter,
    private readonly eventMutationsAdapter: EventMutationsAdapter,
  ) { }

  async handle(event: EventCoreEntity & { id: number }, profileId: string) {
    if (event.organizer_id === profileId) {
      return 'Organizer cannot change his status';
    }

    if (event.status_name === 'completed') {
      return 'Event has already taken place';
    }

    if (event.status_name === 'full') {
      await this.eventMutationsAdapter.updateOne(
        { id: event.id },
        { status_name: 'open' },
      );
    }

    await this.eventParticipantAdapter.upsert({
      status_name: 'pending',
      event_id: event.id,
      profile_id: profileId,
    });

    return 'Status has been updated';
  }
}
