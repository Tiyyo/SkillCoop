export class NotificationType {
  readonly name: string;
  validTypes: string[];

  constructor(name: string) {
    this.name = name;
    this.validTypes = ['event', 'friend', 'message', 'system'];
    if (!this.validTypes.includes(name)) {
      // Replace Error with a custom DomainException
      throw new Error('Invalid notification type');
    }
  }
  equals(otherType: NotificationType): boolean {
    return this.name === otherType.name;
  }
}
