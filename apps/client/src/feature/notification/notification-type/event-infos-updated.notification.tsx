import { Link } from 'react-router-dom';
import CoreNotification from '../core';
import { ArrowRight } from 'lucide-react';
<<<<<<< HEAD
import type { Notification } from '@skillcoop/types';
=======
import type { Notification } from 'skillcoop-types';
import { useTranslation } from 'react-i18next';
>>>>>>> aa5cf6df31348fffebf5a3aa2a2bdf2e309550e8

function EventInfosUpdatedNotification({
  notification,
}: {
  notification: Notification;
}) {
  const { t } = useTranslation('notification');
  const originalMessage = notification.message;
  const dateRegex = /on\s(.*?),\s+in/;
  const buildMessage = () => {
    const date = originalMessage.match(dateRegex);
    if (date && date[1]) {
      return (
        <>
          {t('detailsScheduledOn')}
          <span className="font-medium text-dark"> {date[1]}, </span>
          {t('inWhichYouAreParticipating')}
        </>
      );
    }
    return originalMessage;
  };
  return (
    <CoreNotification
      createdAt={notification.created_at}
      id={notification.id}
      isRead={!!notification.is_read}
      message={buildMessage()}
    >
      <Link
        to={`/event/${notification.event_id}`}
        className="self-end flex items-center gap-x-0.5 text-xxs 
        font-semibold text-primary-1000 
        underline underline-offset-4 pr-4"
      >
        {t('goToEventPage')}
        <ArrowRight size={14} />
      </Link>
    </CoreNotification>
  );
}

export default EventInfosUpdatedNotification;
