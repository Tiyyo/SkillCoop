import AddedFriendsNotification from './added-friends.notification';
import EventInfosUpdatedNotification from './event-infos-updated.notification';
import EventInvitationNotification from './event-invitation.notification';
import FriendRequestNotification from './friend-request.notification';

export type Notification = {
  id: number;
  profile_id: number;
  type: NotificationType;
  message: string;
  instigator_id?: number | null;
  event_id?: number | null;
  created_at: string;
};

export type NotificationType =
  | 'eventInfosHasBeenUpdated'
  | 'userHasBeenInvitedToEvent'
  | 'userReceivedFriendRequest'
  | 'userHasBeenAddedToFriendlist';

export const notificationType = {
  eventInfosHasBeenUpdated: 'eventInfosHasBeenUpdated',
  userHasBeenInvitedToEvent: 'userHasBeenInvitedToEvent',
  userReceivedFriendRequest: 'userReceivedFriendRequest',
  userHasBeenAddedToFriendlist: 'userHasBeenAddedToFriendlist',
} as const;

function DispatchNotifications(notification: Notification) {
  console.log(notification);
  if (notification.type === notificationType.eventInfosHasBeenUpdated) {
    return (
      <EventInfosUpdatedNotification
        id={notification.id}
        message={notification.message}
      />
    );
  }
  if (notification.type === notificationType.userHasBeenInvitedToEvent) {
    return <EventInvitationNotification notification={notification} />;
  }
  if (notification.type === notificationType.userReceivedFriendRequest) {
    return <FriendRequestNotification notification={notification} />;
  }
  if (notification.type === notificationType.userHasBeenAddedToFriendlist) {
    return <AddedFriendsNotification notification={notification} />;
  }
  return null;
}

export default DispatchNotifications;
