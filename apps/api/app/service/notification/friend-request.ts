import { NotificationHandler } from './core';
import { profile as Profile } from '../../models/index';
import { BuildNotificationMessage } from './message.builder';
import {
  BuilderFriendRequestNotificationMessage,
  NotificationType,
  notificationType,
} from './types';

class UserReceivedFriendRequest extends NotificationHandler {
  declare instigatorId: number;
  declare subscriberId: number;
  declare type: NotificationType;
  declare builder: BuilderFriendRequestNotificationMessage;
  constructor(instigatorId: number, subscriberId: number) {
    super();
    this.instigatorId = instigatorId;
    this.subscriberId = subscriberId;
    this.type = notificationType.userReceivedFriendRequest;
    const builder = new BuildNotificationMessage(this.type);
    // TODO : find a way to infer correct type to builder and remove cast
    this.builder = builder.getBuilder(this.type) as BuilderFriendRequestNotificationMessage;
  }
  async getSubscribers(): Promise<number[] | null> {
    const { active_notification } = await Profile.findByPk(this.subscriberId);
    if (active_notification === 0) return null;
    return active_notification === 0 ? null : [this.subscriberId];
  }
  async getInstigatorUsername(): Promise<string> {
    const { username } = await Profile.findByPk(this.instigatorId);
    return username;
  }
  async sendNotification(username: string) {
    const message = this.builder(username);
    if (!this.subscriberId) return;
    this.addNotificationToDatabase({ profileId: this.subscriberId, message, type: this.type });
    this.triggerEvent(this.subscriberId);
  }
  async notify() {
    const username = await this.getInstigatorUsername();
    await this.sendNotification(username);
  }
}

export const notifyUserReceivedFriendRequest = async (
  instigatorId: number,
  subscriberId: number,
) => {
  const userReceivedFriendRequest = new UserReceivedFriendRequest(instigatorId, subscriberId);
  await userReceivedFriendRequest.notify();
};
