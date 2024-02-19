import { InvitationStatus } from '../value-objects/invitation-status.vo';

export class FriendEntity {
  adder_id: string;
  friend_id: string;
  status: InvitationStatus;

  constructor({ user_id, friend_id, status }) {
    this.adder_id = user_id;
    this.friend_id = friend_id;
    this.status = new InvitationStatus(status);
  }
}
