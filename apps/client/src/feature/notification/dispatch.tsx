import { Notification } from '@skillcoop/types/src';
import { notificationSubtype } from '@skillcoop/types/src';
/*eslint-disable*/
import AddedFriendsNotification from './notification-type/added-friends.notification';
import EventInfosUpdatedNotification from './notification-type/event-infos-updated.notification';
import EventInvitationNotification from './notification-type/event-invitation.notification';
import FriendRequestNotification from './notification-type/friend-request.notification';
import TeamGeneratedNotification from './notification-type/team-generated.notification';
import TransfertOwnershipNotification from './notification-type/transfert-ownership.notification';
/*eslint-enable*/

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
