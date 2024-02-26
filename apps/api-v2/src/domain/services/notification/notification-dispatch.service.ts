import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class NotificationDispatchService {
  constructor(private readonly eventEmiter: EventEmitter2) { }
  dispatch(notification: any) {
    notification.transports.forEach((transport: any) => {
      if (transport === 'email') {
        this.sendEmaiNotification();
      }
      if (transport === 'website') {
        this.eventEmiter.emit('new-notification', notification);
      }
      if (transport === 'push') {
        this.sendPushNotification();
      }
    });
  }
  private sendEmaiNotification() {
    // console.log('Send email notification:', notification);
  }
  private sendPushNotification() {
    // console.log('Send push notification:', notification);
  }
}
