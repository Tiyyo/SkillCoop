import { useFriendInvitationActions } from '../../../hooks/useFriends';
import type { Notification } from '@skillcoop/types/src';
import { invitationStatus } from '@skillcoop/types/src';
import CoreNotification from '../core';
import { useTranslation } from 'react-i18next';

function FriendRequestNotification({
  notification,
}: {
  notification: Notification;
}) {
  const { t } = useTranslation('notification');
  const { mutate: acceptOrDeclineInvitation } = useFriendInvitationActions({});
  const originalMessage = notification.message;
  const splitWordFrom = 'from';
  const username = originalMessage.split(splitWordFrom)[1];
  const buildMessage = () => {
    return (
      <>
        {t('notification:youHaveReceivedAFriend')}
        <span className="font-medium text-text-base">{username}</span>
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
          className="rounded-md bg-primary-400 px-2 py-1"
          value={invitationStatus.confirmed}
          onClick={handleClickActionOnInvition}
        >
          {t('system:accept')}
        </button>
        <button
          className="bg-primary-210 px-2 py-1"
          value={invitationStatus.declined}
          onClick={handleClickActionOnInvition}
        >
          {t('system:decline')}
        </button>
      </div>
    </CoreNotification>
  );
}

export default FriendRequestNotification;
