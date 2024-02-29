import { Injectable } from '@nestjs/common';
import { NotificationPreferenceService } from '../user-prefrerences/notification-preference.service';

// retrieve the transport subscribed by the user
@Injectable()
export class UserTransportNotificationService {
  constructor(
    private readonly notificationPreferenceService: NotificationPreferenceService,
  ) {}
  async get(ids: string[], notificationType: string) {
    const getSubscribersQueries = await ids.map((id) =>
      this.notificationPreferenceService.get(id, notificationType),
    );
    const subscribers = await Promise.allSettled(getSubscribersQueries);
    return subscribers
      .map((subscriber, index) => {
        if (subscriber.status === 'fulfilled') {
          return {
            profileId: ids[index],
            transports:
              this.flatenTransportValue(subscriber.value).length > 0
                ? this.flatenTransportValue(subscriber.value)
                : null,
          };
        }
        return null;
      })
      .filter((s) => s.transports);
  }
  // flat the result and remove the first element
  private flatenTransportValue(value: Array<string>[]) {
    return value.flat().filter((el, i) => {
      if (i === 0) return false;
      return true;
    });
  }
}
