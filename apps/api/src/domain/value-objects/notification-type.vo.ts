import { DomainException } from '../shared/domain-exception';

export class NotificationType {
  readonly name: string;
  validTypes: string[];

  constructor(name: string) {
    this.name = name;
    this.validTypes = ['event', 'friend', 'message', 'system'];
    if (!this.validTypes.includes(name)) {
      throw new DomainException(
        'Invalid notification type',
        'NotificationType',
      );
    }
  }
  equals(otherType: NotificationType): boolean {
    return this.name === otherType.name;
  }
}
