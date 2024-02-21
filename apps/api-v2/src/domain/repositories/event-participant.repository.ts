import {
  EventParticipantEntity,
  TInvitationStatus,
} from '../entities/event-participant.entity';

export abstract class EventParticipantRepository {
  abstract updateStatusWithExistenceCheck({
    event_id,
    profile_id,
    status_name,
  }: {
    event_id: number;
    profile_id: string;
    status_name: TInvitationStatus;
  }): Promise<boolean>;
  abstract find(
    findObject: Partial<EventParticipantEntity>,
  ): Promise<EventParticipantEntity[]>;
  abstract upsert(data: {
    event_id: number;
    profile_id: string;
    status_name: TInvitationStatus;
  }): Promise<boolean>;
  abstract getAttendedEventCount(
    profileId: string,
  ): Promise<{ nb_attended_events: number }>;
  abstract getWinningRate(profileId: string): Promise<{ winning_rate: number }>;
}
