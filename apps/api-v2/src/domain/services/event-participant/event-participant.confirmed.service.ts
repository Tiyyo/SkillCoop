import { Inject, Injectable } from '@nestjs/common';
import { EventCoreEntity } from 'src/domain/entities/event.entity';
import { EventParticipantAdapter } from 'src/infrastructure/kysely/adapters/event-participant.adapter';
import { EventMutationsAdapter } from 'src/infrastructure/kysely/adapters/event.mutations.adapter';
import { EventStatusEvaluator } from './event-status-evaluator.service';
import { GenerateTeamService } from '../generate-teams/generate-team.service';
import { EmitEventInterface } from 'src/application/services/event.service';

@Injectable()
export class EventParticipantConfirmedService {
  constructor(
    private readonly eventParticipantAdapter: EventParticipantAdapter,
    private readonly eventMutationsAdapter: EventMutationsAdapter,
    private readonly eventStatusEvaluator: EventStatusEvaluator,
    private readonly generationTeamService: GenerateTeamService,
    @Inject('EmitEventService') private eventEmitter: EmitEventInterface,
  ) { }

  async handle(event: EventCoreEntity & { id: number }, profileId: string) {
    const eventState = await this.eventStatusEvaluator.evaluate(
      event.id,
      event.required_participants,
    );
    if (eventState === 'full') {
      return 'Event is already full';
    }
    if (eventState === 'open') {
      await this.eventParticipantAdapter.updateStatusWithExistenceCheck({
        profile_id: profileId,
        event_id: event.id,
        status_name: 'confirmed',
      });
      this.eventEmitter.participantConfirmed({
        eventId: event.id,
        profileId,
      });
      return 'Status has been updated';
    }
    if (eventState === 'oneSpotLeft') {
      await this.eventMutationsAdapter.updateOne(
        { id: event.id },
        { status_name: 'full' },
      );
      await this.generationTeamService.generate(event.id);
      return 'Teams has been generated ';
    }
    return 'Could not find event';
  }
}
