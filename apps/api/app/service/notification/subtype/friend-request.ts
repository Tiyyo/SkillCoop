import { NotificationObserver } from './core';
import { profile as Profile } from '../../../models/index';
import { BuildNotificationMessage } from '../message.builder';
import {
  BuilderFriendRequestNotificationMessage,
  NotificationSubtype,
  NotificationType,
  notificationSubtype,
  notificationType,
} from '../types';

class UserReceivedFriendRequest extends NotificationObserver {
  declare instigatorId: number;
  declare subscriberId: number;
  declare subtype: NotificationSubtype;
  declare builder: BuilderFriendRequestNotificationMessage;
  constructor(type: NotificationType, instigatorId: number, subscriberId: number) {
    super(type);
    this.instigatorId = instigatorId;
    this.subscriberId = subscriberId;
    this.subtype = notificationSubtype.userReceivedFriendRequest;
    const builder = new BuildNotificationMessage(this.subtype);
    // TODO : find a way to infer correct subtype to builder and remove cast
    this.builder = builder.getBuilder(this.subtype) as BuilderFriendRequestNotificationMessage;
  }
  async getSubscribers(): Promise<number[] | null> {
    const { active_notification } = await Profile.findByPk(this.subscriberId);
    if (active_notification === 0) return null;
    return active_notification === 0 ? null : [this.subscriberId];
  }
  async getInstigatorInfos(): Promise<{ username: string; avatar_url: string | null }> {
    const { username, avatar_url } = await Profile.findByPk(this.instigatorId);
    return { username, avatar_url };
  }
  async sendNotification(username: string, img_url: string | null = null) {
    const message = this.builder(username);
    if (!this.subscriberId) return;
    this.addNotificationToDatabase({
      profileId: this.subscriberId,
      message,
      type: this.type,
      subtype: this.subtype,
      img_url,
      instigatorId: this.instigatorId,
    });
    this.triggerEvent(this.subscriberId);
  }
  async notify() {
    const { username, avatar_url } = await this.getInstigatorInfos();
    await this.sendNotification(username, avatar_url);
  }
}

export const notifyUserReceivedFriendRequest = async (
  instigatorId: number,
  subscriberId: number,
) => {
  const userReceivedFriendRequest = new UserReceivedFriendRequest(
    notificationType.friend,
    instigatorId,
    subscriberId,
  );
  await userReceivedFriendRequest.notify();
};