import { TInvitationStatus } from '../entities/event-participant.entity';
import { DomainException } from '../shared/domain-exception';

function isValidInvitationStatus(status: string): status is TInvitationStatus {
  return ['confirmed', 'declined', 'pending', 'requested', 'refused'].includes(
    status,
  );
}

export class InvitationStatus {
  readonly name: string;
  validStatus: TInvitationStatus[];

  constructor(name: TInvitationStatus) {
    this.validStatus = [
      'pending',
      'confirmed',
      'declined',
      'requested',
      'refused',
    ];
    if (!this.validStatus.includes(name) && isValidInvitationStatus(name)) {
      throw new DomainException(
        `Expect status to be from ${this.validStatus}`,
        'InvitationStatus',
      );
    }
    this.name = name;
  }
  equals(otherType: InvitationStatus): boolean {
    return this.name === otherType.name;
  }
}
