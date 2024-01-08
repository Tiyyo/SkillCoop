import type { Notification } from '@skillcoop/types';
import CoreNotification from '../core';

function AddedFriendsNotification({
  notification,
}: {
  notification: Notification;
}) {
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
          You are now friend with{' '}
          <span className="font-medium text-dark">{username}</span>
        </>
      }
    />
  );
}

export default AddedFriendsNotification;
