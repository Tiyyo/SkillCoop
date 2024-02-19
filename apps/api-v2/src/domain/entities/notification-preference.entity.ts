import { NotificationType } from '../value-objects/notification-type.vo';

export class NotificationPreferenceEntity {
  user_id: string;
  type: NotificationType;
  email: boolean;
  push: boolean;
  website: boolean;

  constructor({ user_id, type }: NotificationPreferenceEntity) {
    this.user_id = user_id;
    this.type = type;
    this.email = true;
    this.push = true;
    this.website = true;
  }
}
