import { EventEmitter } from 'events';
import { SSENotificationData } from 'skillcoop-types';

class NotificationEventManager extends EventEmitter {
  constructor() {
    super();
  }
  new(profileId: number) {
    this.emit('new-notification', {
      profileId,
      message: 'new notification add to database',
    } as SSENotificationData);
  }
  // onNew(action: (data: SSENotificationData) => void) {
  //   this.on('new-notification', (data) => {
  //     action(data);
  //     console.log('Is event is listen ? :', data);
  //   });
  // }
}

export const notificationEventManager = new NotificationEventManager();
