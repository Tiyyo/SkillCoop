import { DomainException } from '../shared/domain-exception';
import { TInvitationStatus } from './event-participant.entity';

function isValidInvitationStatus(status: string): status is TInvitationStatus {
  return ['confirmed', 'declined', 'pending', 'requested', 'refused'].includes(
    status,
  );
}

export class FriendEntity {
  adder_id: string;
  friend_id: string;
  status_name: string;

  constructor({ user_id, friend_id, status }) {
    this.adder_id = user_id;
    this.friend_id = friend_id;
    if (!isValidInvitationStatus(status)) {
      throw new DomainException(
        `Friend should have a valid status except got confirmed or declined or pending or requested or refused +
        ${status}`,
        'EventParticipantEntity',
      );
    }
    this.status_name = status;
  }
}
