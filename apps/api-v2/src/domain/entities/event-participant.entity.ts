import { InvitationStatus } from '../value-objects/invitation-status.vo';

export class EventParticipantEntity {
  event_id: string;
  profile_id: string;
  team: number;
  status_name: InvitationStatus;

  constructor({
    event_id,
    profile_id,
    team,
    status_name,
  }: {
    event_id: string;
    profile_id: string;
    team: number;
    status_name: string;
  }) {
    this.event_id = event_id;
    this.profile_id = profile_id;
    this.team = team;
    this.status_name = new InvitationStatus(status_name);
  }
}
