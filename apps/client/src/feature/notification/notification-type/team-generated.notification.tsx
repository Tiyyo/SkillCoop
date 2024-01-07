import { Link } from 'react-router-dom';
import CoreNotification from '../core';
import { ArrowRight } from 'lucide-react';
import type { Notification } from 'skillcoop-types';
import { useTranslation } from 'react-i18next';

function TeamGeneratedNotification({
  notification,
}: {
  notification: Notification;
}) {
  const { t } = useTranslation('notification');
  const dateRegex = /scheduled on\s(.*?)\s+has/;
  const date = notification.message.match(dateRegex)?.[1];
  const buildMessage = () => {
    if (date) {
      return (
        <>
          {t('eventScheduledOn')}{' '}
          <span className="font-medium text-dark">{date}</span>{' '}
          {t('hasReachedItsMaximumNumberOfParticipants')}
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
      message={buildMessage()}
    >
      <Link
        to={`/event/${notification.event_id}`}
        className="self-end flex items-center gap-x-0.5 text-xxs font-semibold 
      text-primary-1000 
        underline underline-offset-4 pr-4"
      >
        {t('goToEventPage')}
        <ArrowRight size={14} />
      </Link>
    </CoreNotification>
  );
}

export default TeamGeneratedNotification;
