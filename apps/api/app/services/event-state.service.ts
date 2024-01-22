import { EventWithoutAggr, invitationStatus } from '@skillcoop/types';
import { profileOnEvent as ProfileOnEvent } from '#models';
import logger from '#logger';

type EventCurrentState = 'open' | 'oneSpotLeft' | 'full' | 'notFound';

export class EventStatusEvaluator {
  requiredParticipant: number | null;
  declare confirmedParticipants: number | null;

  constructor(private event: EventWithoutAggr) {
    this.event = event;
    this.requiredParticipant = event.required_participants;
  }
  private async getEventInfos() {
    try {
      const confirmedParticipants = await ProfileOnEvent.find({
        event_id: this.event.id,
        status_name: invitationStatus.confirmed,
      });
      this.confirmedParticipants = confirmedParticipants
        ? confirmedParticipants.length
        : null;
    } catch (error) {
      if (error instanceof Error) {
        logger.error(error.message);
      }
    }
  }
  async status(): Promise<EventCurrentState> {
    await this.getEventInfos();
    if (!this.requiredParticipant || !this.confirmedParticipants) {
      return 'notFound';
    }
    if (this.requiredParticipant === this.confirmedParticipants + 1) {
      return 'oneSpotLeft';
    }
    if (this.requiredParticipant <= this.confirmedParticipants) {
      return 'full';
    }
    return 'open';
  }
}
