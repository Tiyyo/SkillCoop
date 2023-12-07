import { Divide } from 'lucide-react';
import AddedFriendsNotification from './notification-type/added-friends.notification';
import EventInfosUpdatedNotification from './notification-type/event-infos-updated.notification';
import EventInvitationNotification from './notification-type/event-invitation.notification';
import FriendRequestNotification from './notification-type/friend-request.notification';
import defaultAvatar from '../../../public/images/default-avatar.png';
import CoreNotification from './core';
import TeamGeneratedNotification from './notification-type/team-generated.notification';
import TransfertOwnershipNotification from './notification-type/transfert-ownership.notification';

export type Notification = {
  id: number;
  profile_id: number;
  type: NotificationType;
  subtype: string;
  img_url?: string | null;
  is_read: number;
  message: string;
  instigator_id?: number | null;
  event_id?: number | null;
  created_at: string;
};

export type NotificationType = 'event' | 'friend';

export type NotificationSubtype =
  | 'eventInfosHasBeenUpdated'
  | 'userHasBeenInvitedToEvent'
  | 'userReceivedFriendRequest'
  | 'userHasBeenAddedToFriendlist'
  | 'teamHasBeenGenerated'
  | 'transfertOwnership';

export const notificationSubtype = {
  eventInfosHasBeenUpdated: 'eventInfosHasBeenUpdated',
  userHasBeenInvitedToEvent: 'userHasBeenInvitedToEvent',
  userReceivedFriendRequest: 'userReceivedFriendRequest',
  userHasBeenAddedToFriendlist: 'userHasBeenAddedToFriendlist',
  teamHasBeenGenerated: 'teamHasBeenGenerated',
  transfertOwnership: 'transfertOwnership',
} as const;

export const notificationType = {
  event: 'event',
  friend: 'friend',
} as const;

function DispatchNotifications(notification: Notification) {
  if (
    notification.subtype === notificationSubtype.userHasBeenAddedToFriendlist
  ) {
    return <AddedFriendsNotification notification={notification} />;
  }
  if (notification.subtype === notificationSubtype.eventInfosHasBeenUpdated) {
    return <EventInfosUpdatedNotification notification={notification} />;
  }
  if (notification.subtype === notificationSubtype.userHasBeenInvitedToEvent) {
    return <EventInvitationNotification notification={notification} />;
  }
  if (notification.subtype === notificationSubtype.userReceivedFriendRequest) {
    return <FriendRequestNotification notification={notification} />;
  }
  if (notification.subtype === notificationSubtype.teamHasBeenGenerated) {
    return <TeamGeneratedNotification notification={notification} />;
  }
  if (notification.subtype === notificationSubtype.transfertOwnership) {
    return <TransfertOwnershipNotification notification={notification} />;
  }
}

export default DispatchNotifications;
