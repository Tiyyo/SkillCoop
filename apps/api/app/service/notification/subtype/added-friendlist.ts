import { NotificationObserver } from './core';
import { BuildNotificationMessage } from '../message.builder';
import { profile as Profile } from '../../../models/index';
import type {
  BuilderAddedToFriendlistNotificationMessage,
  NotificationSubtype,
  NotificationType,
} from 'skillcoop-types';
import { notificationSubtype, notificationType } from 'skillcoop-types';

class UserHasBeenAddedToFriendlist extends NotificationObserver {
  declare instigatorId: number;
  declare subscriberId: number;
  declare subtype: NotificationSubtype;
  declare builder: BuilderAddedToFriendlistNotificationMessage;
  constructor(
    type: NotificationType,
    instigatorId: number,
    subscriberId: number,
  ) {
    super(type);
    this.subtype = notificationSubtype.userHasBeenAddedToFriendlist;
    this.instigatorId = instigatorId;
    this.subscriberId = subscriberId;
    const builder = new BuildNotificationMessage(this.subtype);
    // TODO : find a way to infer correct type to builder and remove cast
    this.builder = builder.getBuilder(
      this.subtype,
    ) as BuilderAddedToFriendlistNotificationMessage;
  }
  async getSubscribers(): Promise<number[] | null> {
    const { active_notification } = await Profile.findByPk(this.subscriberId);
    if (active_notification === 0) return null;
    return active_notification === 0 ? null : [this.subscriberId];
  }
  async getInstigatorInfos(): Promise<{
    username: string;
    avatar_url: string | null;
  }> {
    const { username, avatar_url } = await Profile.findByPk(this.instigatorId);
    return { username, avatar_url };
  }
  async sendNotification(username: string, avatar_url: string | null = null) {
    const message = this.builder(username);
    if (!this.subscriberId) return;
    this.addNotificationToDatabase({
      profileId: this.subscriberId,
      message,
      type: this.type,
      subtype: this.subtype,
      img_url: avatar_url,
    });
    this.triggerEvent(this.subscriberId);
  }
  async notify() {
    const { username, avatar_url } = await this.getInstigatorInfos();
    await this.sendNotification(username, avatar_url);
  }
}

export const notifyUserHasBeenAddedToFriendlist = async (
  instigatorId: number,
  subscriberId: number,
) => {
  const userHasBeenAddedToFriendlist = new UserHasBeenAddedToFriendlist(
    notificationType.friend,
    instigatorId,
    subscriberId,
  );
  await userHasBeenAddedToFriendlist.notify();
};
