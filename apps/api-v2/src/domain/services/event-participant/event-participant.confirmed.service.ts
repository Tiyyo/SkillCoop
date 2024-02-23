import { Injectable } from '@nestjs/common';
import { EventCoreEntity } from 'src/domain/entities/event.entity';
import { EventParticipantAdapter } from 'src/infrastructure/kysely/adapters/event-participant.adapter';
import { EventMutationsAdapter } from 'src/infrastructure/kysely/adapters/event.mutations.adapter';
import { EventStatusEvaluator } from './event-status-evaluator.service';

@Injectable()
export class EventParticipantConfirmedService {
  constructor(
    private readonly eventParticipantAdapter: EventParticipantAdapter,
    private readonly eventMutationsAdapter: EventMutationsAdapter,
    private readonly eventStatusEvaluator: EventStatusEvaluator,
  ) { }

  async handle(event: EventCoreEntity & { id: number }, profileId: string) {
    const eventState = await this.eventStatusEvaluator.evaluate(
      event.id,
      event.required_participants,
    );
    if (eventState === 'open') {
      await this.eventParticipantAdapter.updateStatusWithExistenceCheck({
        profile_id: profileId,
        event_id: event.id,
        status_name: 'confirmed',
      });
      //  Sync database with chat service to add them in group event
      return 'Status has been updated';
    }
    if (eventState === 'oneSpotLeft') {
      await this.eventMutationsAdapter.updateOne(
        { id: event.id },
        { status_name: 'full' },
      );
      // Generate team here
      return 'Teams has been generated ';
    }
    if (eventState === 'full') {
      return 'Event is already full';
    }
    return 'Could not find event';
  }
}
