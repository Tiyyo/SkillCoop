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
      // Replace Error with a custom DomainException
      throw new Error('Invalid event status');
    }
  }
  equals(otherType: InvitationStatus): boolean {
    return this.name === otherType.name;
  }
}
