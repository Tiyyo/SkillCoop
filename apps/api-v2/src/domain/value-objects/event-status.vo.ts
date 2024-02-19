export class EventStatus {
  readonly name: string;
  validStatus: string[];

  constructor(name: string) {
    this.validStatus = ['open', 'full', 'cancelled', 'completed'];
    if (!this.validStatus.includes(name)) {
      // Replace Error with a custom DomainException
      throw new Error('Invalid event status');
    }
    this.name = name;
  }
  equals(otherType: EventStatus): boolean {
    return this.name === otherType.name;
  }
}
