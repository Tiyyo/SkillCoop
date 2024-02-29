import { Inject, Injectable } from '@nestjs/common';
import { EmitEventInterface } from 'src/application/services/event.service';
import { EventCoreEntity } from 'src/domain/entities/event.entity';
import { EventParticipantAdapter } from 'src/infrastructure/kysely/adapters/event-participant.adapter';
import { EventMutationsAdapter } from 'src/infrastructure/kysely/adapters/event.mutations.adapter';

@Injectable()
export class EventParticipantDeclinedService {
  constructor(
    private readonly eventParticipantAdapter: EventParticipantAdapter,
    private readonly eventMutationsAdapter: EventMutationsAdapter,
    @Inject('EmitEventService') private eventEmitter: EmitEventInterface,
  ) {}

  async handle(event: EventCoreEntity & { id: number }, profileId: string) {
    if (event.organizer_id === profileId) {
      return 'Organizer cannot change his status';
    }
    if (event.status_name === 'completed') {
      return 'Event has already taken place';
    }
    // TODO : Event should be passed as open only if participant was
    // confirmed participant to the event
    if (event.status_name === 'full') {
      await this.eventMutationsAdapter.updateOne(
        { id: event.id },
        { status_name: 'open' },
      );
    }
    await this.eventParticipantAdapter.updateStatusWithExistenceCheck({
      event_id: event.id,
      status_name: 'declined',
      profile_id: profileId,
    });
    this.eventEmitter.participantDeclined({
      eventId: event.id,
      profileId,
    });
    return 'Status has been updated';
  }
}
