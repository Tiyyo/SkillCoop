import type { Notification } from '@skillcoop/types/src';
import CoreNotification from '../wrapper';
import { useTranslation } from 'react-i18next';

function AddedFriendsNotification({
  notification,
}: {
  notification: Notification;
}) {
  const { t } = useTranslation('notification');
  const username = notification.message.split(' ').pop();

  return (
    <CoreNotification
      createdAt={notification.created_at}
      id={notification.id}
      isRead={!!notification.is_read}
      username={username}
      image={notification.img_url}
      message={
        <>
          {t('youAreNowFriendsWith')}{' '}
          <span className="font-medium text-text-base">{username}</span>
        </>
      }
    />
  );
}

export default AddedFriendsNotification;
