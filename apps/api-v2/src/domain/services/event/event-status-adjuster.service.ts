import { Injectable } from '@nestjs/common';
import { ApplicationException } from 'src/application/exceptions/application.exception';
import { EventCoreEntity } from 'src/domain/entities/event.entity';

export type UpdateEventData = {
  date: string;
  start_time?: string;
  start_date?: string;
  duration: number;
  location: string;
  required_participants: number;
  organizer_id: string;
  status_name: string;
  participants?: string[];
};

export type ProfileOnEventRessource = {
  created_at: string;
  updated_at: string | null;
  event_id: number;
  profile_id: number;
  status_name: string;
  team: number | null;
};
@Injectable()
export class EventStatusAdjusterService {
  declare updateData: UpdateEventData;
  constructor() { }
  data(
    updateRawData: UpdateEventData,
    event: EventCoreEntity,
    confirmedParticipants: Array<any>,
  ) {
    this.adjustStatus(updateRawData, event, confirmedParticipants);
    this.removeUnwantedFields();
    return this.updateData;
  }
  private adjustStatus(
    updateRawData: UpdateEventData,
    event: EventCoreEntity,
    confirmedParticipants: Array<any>,
  ) {
    this.updateData = updateRawData;
    if (event.required_participants)
      throw new ApplicationException(
        'Event required_participants is not defined',
        'EventStatusAdjusterService',
      );
    if (updateRawData.required_participants > event.required_participants) {
      this.updateData.status_name = 'open';
    }
    if (
      confirmedParticipants &&
      updateRawData.required_participants === confirmedParticipants.length
    ) {
      this.updateData.status_name = 'full';
    }
  }
  private removeUnwantedFields() {
    delete this.updateData.start_date;
    delete this.updateData.start_time;
  }
}
