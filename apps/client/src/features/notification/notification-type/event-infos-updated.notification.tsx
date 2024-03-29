import { Link } from 'react-router-dom';
import CoreNotification from '../wrapper';
import { ArrowRight } from 'lucide-react';
import type { Notification } from '@skillcoop/types/src';
import { useTranslation } from 'react-i18next';

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

export default EventInfosUpdatedNotification;
