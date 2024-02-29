import { NotificationDBEntity } from '../entities/notification.entity';

export abstract class NotificationRepository {
  abstract getLast(profileId: string): Promise<NotificationDBEntity[]>;
}
