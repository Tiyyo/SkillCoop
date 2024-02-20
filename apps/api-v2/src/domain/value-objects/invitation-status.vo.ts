import { DomainException } from '../shared/domain-exception';

export class InvitationStatus {
  readonly name: string;
  validStatus: string[];

  constructor(name: string) {
    this.name = name;
    this.validStatus = [
      'pending',
      'confirmed',
      'declined',
      'requested',
      'refused',
    ];
    if (!this.validStatus.includes(name)) {
      throw new DomainException(
        `Expect status to be from ${this.validStatus}`,
        'EventStatus',
      );
    }
  }
  equals(otherType: InvitationStatus): boolean {
    return this.name === otherType.name;
  }
}
