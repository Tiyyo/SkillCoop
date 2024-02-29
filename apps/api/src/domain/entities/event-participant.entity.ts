import { DomainException } from '../shared/domain-exception';
export type TInvitationStatus =
  | 'confirmed'
  | 'declined'
  | 'pending'
  | 'requested'
  | 'refused';

function isValidInvitationStatus(status: string): status is TInvitationStatus {
  return ['confirmed', 'declined', 'pending', 'requested', 'refused'].includes(
    status,
  );
}

export class EventParticipantEntity {
  event_id: number;
  profile_id: string;
  team: number;
  status_name: TInvitationStatus | string;

  constructor({
    event_id,
    profile_id,
    team,
    status_name,
  }: {
    event_id: number;
    profile_id: string;
    team: number;
    status_name: string;
  }) {
    this.event_id = event_id;
    this.profile_id = profile_id;
    this.team = team;
    if (!isValidInvitationStatus(status_name)) {
      throw new DomainException(
        'Invalid status name',
        'EventParticipantEntity',
      );
    }
    this.status_name = status_name;
  }
}
