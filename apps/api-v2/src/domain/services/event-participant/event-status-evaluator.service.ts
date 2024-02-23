import { Injectable } from '@nestjs/common';
import { ApplicationException } from 'src/application/exceptions/application.exception';
import { EventParticipantAdapter } from 'src/infrastructure/kysely/adapters/event-participant.adapter';

type EventCurrentState = 'open' | 'oneSpotLeft' | 'full' | 'notFound';

@Injectable()
export class EventStatusEvaluator {
  declare requiredParticipant: number | null;
  declare confirmedParticipants: number | null;

  constructor(
    private readonly eventParticipantAdapter: EventParticipantAdapter,
  ) { }
  private async getEventInfos(eventId: number) {
    try {
      const confirmedParticipants = await this.eventParticipantAdapter.find({
        event_id: eventId,
        status_name: 'confirmed',
      });
      this.confirmedParticipants = confirmedParticipants
        ? confirmedParticipants.length
        : null;
    } catch (error) {
      if (error instanceof Error) {
        throw new ApplicationException(error.message, 'EventStatusEvaluator');
      }
    }
  }
  async evaluate(
    eventId: number,
    requiredParticipant: number,
  ): Promise<EventCurrentState> {
    await this.getEventInfos(eventId);
    if (!requiredParticipant || !this.confirmedParticipants) {
      return 'notFound';
    }
    if (requiredParticipant === this.confirmedParticipants + 1) {
      return 'oneSpotLeft';
    }
    if (requiredParticipant <= this.confirmedParticipants) {
      return 'full';
    }
    return 'open';
  }
}
