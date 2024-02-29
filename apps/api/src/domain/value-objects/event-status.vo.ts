import { DomainException } from '../shared/domain-exception';

export class EventStatus {
  readonly name: string;
  validStatus: string[];

  constructor(name: string) {
    this.validStatus = ['open', 'full', 'cancelled', 'completed'];
    if (!this.validStatus.includes(name)) {
      throw new DomainException(
        `Expect status to be from ${this.validStatus}`,
        'EventStatus',
      );
    }
    this.name = name;
  }
  equals(otherType: EventStatus): boolean {
    return this.name === otherType.name;
  }
}
