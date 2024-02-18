import { EventStatus, EventWithoutAggr } from '@skillcoop/types';
import ServerError from '../../helpers/errors/server.error.js';

export type UpdateEventData = {
  date: string;
  start_time?: string;
  start_date?: string;
  duration: number;
  location: string;
  required_participants: number;
  organizer_id: number;
  status_name: EventStatus;
  participants?: number[];
};

export type ProfileOnEventRessource = {
  created_at: string;
  updated_at: string | null;
  event_id: number;
  profile_id: number;
  status_name: string;
  team: number | null;
};

export class EventStatusAdjusterService {
  constructor(
    private updateData: UpdateEventData,
    private event: EventWithoutAggr,
    private confirmedParticipants: Array<ProfileOnEventRessource> | undefined,
  ) {
    this.updateData = updateData;
    this.event = event;
    this.confirmedParticipants = confirmedParticipants;
  }
  get data() {
    this.adjustStatus();
    this.removeUnwantedFields();
    return this.updateData;
  }
  private adjustStatus() {
    if (!this.event.required_participants)
      throw new ServerError('Event required_participants is not defined');
    if (
      this.updateData.required_participants > this.event.required_participants
    ) {
      this.updateData.status_name = 'open';
    }
    if (
      this.confirmedParticipants &&
      this.updateData.required_participants ===
        this.confirmedParticipants.length
    ) {
      this.updateData.status_name = 'full';
    }
  }
  private removeUnwantedFields() {
    delete this.updateData.start_date;
    delete this.updateData.start_time;
  }
}
