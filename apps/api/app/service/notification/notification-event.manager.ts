import { EventEmitter } from 'events';
import { SSENotificationData } from './types';

class NotificationEventManager extends EventEmitter {
  constructor() {
    super();
  }
  new(profileId: number) {
    this.emit('new-notification', {
      profileId,
      message: 'new notification add to database',
    });
  }
  onNew(action: (data: SSENotificationData) => void) {
    this.on('new-notification', (data) => {
      action(data);
    });
  }
}

export const notificationEventManager = new NotificationEventManager();
