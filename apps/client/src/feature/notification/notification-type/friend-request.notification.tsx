import { useFriendInvitationActions } from '../../../hooks/useFriends';
import type { Notification } from '@skillcoop/types';
import { invitationStatus } from '@skillcoop/types';
import CoreNotification from '../core';

function FriendRequestNotification({
  notification,
}: {
  notification: Notification;
}) {
  const { mutate: acceptOrDeclineInvitation } = useFriendInvitationActions({});
  const originalMessage = notification.message;
  const splitWordFrom = 'from';
  const firstpartMessage = originalMessage.split(splitWordFrom)[0];
  const username = originalMessage.split(splitWordFrom)[1];
  const buildMessage = () => {
    return (
      <>
        {firstpartMessage}
        {splitWordFrom}
        <span className="font-medium text-dark">{username}</span>
      </>
    );
  };
  const handleClickActionOnInvition = () => {
    if (!notification.instigator_id) return;
    // TODO : validate date before mutation
    acceptOrDeclineInvitation({
      friend_id: notification.profile_id,
      adder_id: notification.instigator_id,
      status_name: invitationStatus.confirmed,
    });
  };
  return (
    <CoreNotification
      id={notification.id}
      isRead={!!notification.is_read}
      image={notification.img_url}
      createdAt={notification.created_at}
      username={username}
      message={buildMessage()}
    >
      <div className="flex gap-x-2.5">
        <button
          className="px-2 py-1 bg-primary-400 rounded-md"
          value={invitationStatus.confirmed}
          onClick={handleClickActionOnInvition}
        >
          Accept
        </button>
        <button
          className="px-2 py-1 bg-primary-210"
          value={invitationStatus.declined}
          onClick={handleClickActionOnInvition}
        >
          Decline
        </button>
      </div>
    </CoreNotification>
  );
}

export default FriendRequestNotification;
