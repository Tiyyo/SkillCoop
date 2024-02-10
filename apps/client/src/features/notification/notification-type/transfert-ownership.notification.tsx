import { Link } from 'react-router-dom';
import CoreNotification from '../wrapper';
import { ArrowRight } from 'lucide-react';
import type { Notification } from '@skillcoop/types/src';
import { useTranslation } from 'react-i18next';

function TransfertOwnershipNotification({
  notification,
}: {
  notification: Notification;
}) {
  const { t } = useTranslation('notification');
  const username = notification.message.split(' ').shift();

  const buildMessage = () => {
    if (username) {
      const messageWithoutUsername = notification.message.split(username)[1];
      const splitWordOn = 'scheduled on';
      const date = messageWithoutUsername.split(splitWordOn)[1];
      return (
        <>
          <span className="font-medium text-dark">{username} </span>
          {t('hastransferredToYou')}
          <span className="font-medium text-dark"> {date}</span>
        </>
      );
    }
    return notification.message;
  };
  return (
    <CoreNotification
      id={notification.id}
      isRead={!!notification.is_read}
      createdAt={notification.created_at}
      username={username}
      image={notification.img_url}
      message={buildMessage()}
    >
      <Link
        to={`/event/${notification.event_id}`}
        className="flex items-center gap-x-0.5 self-end pr-4 
        text-xxs font-semibold 
        text-primary-1000 underline underline-offset-4"
      >
        {t('goToEventPage')}
        <ArrowRight size={14} />
      </Link>
    </CoreNotification>
  );
}

export default TransfertOwnershipNotification;
