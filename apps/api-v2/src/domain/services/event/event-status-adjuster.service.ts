import { Injectable } from '@nestjs/common';
import { ApplicationException } from 'src/application/exceptions/application.exception';
import { UndefinedException } from 'src/application/exceptions/undefined.exception';
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
  declare updateData: UpdateEventData & {
    event_id?: number;
    profile_id?: string;
  };
  constructor() { }
  data(
    updateRawData: UpdateEventData,
    event: EventCoreEntity & { id: number },
    confirmedParticipants: Array<any>,
  ) {
    this.updateData = updateRawData;
    if (updateRawData.required_participants) {
      this.adjustStatus(updateRawData, event, confirmedParticipants);
    }
    this.removeUnwantedFields();
    return this.updateData;
  }
  private adjustStatus(
    updateRawData: UpdateEventData,
    event: EventCoreEntity & { id: number },
    confirmedParticipants: Array<any>,
  ) {
    if (!event.required_participants)
      throw new UndefinedException(
        'event.required_participants',
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
    delete this.updateData.event_id;
    delete this.updateData.profile_id;
  }
}
