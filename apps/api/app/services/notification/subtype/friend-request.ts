import { NotificationObserver } from './core.js';
import { profile as Profile } from '#models';
import { BuildNotificationMessage } from '../message.builder.js';
import {
  BuilderFriendRequestNotificationMessage,
  NotificationSubtype,
  NotificationType,
} from '@skillcoop/types';
import { notificationSubtype, notificationType } from '@skillcoop/types';

class UserReceivedFriendRequest extends NotificationObserver {
  declare instigatorId: number;
  declare subscriberId: number;
  declare subtype: NotificationSubtype;
  declare builder: BuilderFriendRequestNotificationMessage;
  constructor(
    type: NotificationType,
    instigatorId: number,
    subscriberId: number,
  ) {
    super(type);
    this.instigatorId = instigatorId;
    this.subscriberId = subscriberId;
    this.subtype = notificationSubtype.userReceivedFriendRequest;
    const builder = new BuildNotificationMessage(this.subtype);
    // TODO : find a way to infer correct subtype to builder and remove cast
    this.builder = builder.getBuilder(
      this.subtype,
    ) as BuilderFriendRequestNotificationMessage;
  }
  async getSubscribers(): Promise<number[] | null> {
    const profile = await Profile.findOne({
      profile_id: this.subscriberId,
    });
    if (!profile || profile.active_notification === 0) return null;
    return profile.active_notification === 0 ? null : [this.subscriberId];
  }
  async getInstigatorInfos(): Promise<{
    username: string;
    avatar_url: string | null;
  }> {
    const profile = await Profile.findOne({
      profile_id: this.instigatorId,
    });
    if (!profile || !profile.username) throw new Error('Instigator not found');
    const { username, avatar_url } = profile;
    return { username, avatar_url };
  }
  async sendNotification(username: string, img_url: string | null = null) {
    const message = this.builder(username);
    if (!this.subscriberId) return;
    this.addNotificationToDatabase({
      profileId: this.subscriberId,
      message,
      type_name: this.type,
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
