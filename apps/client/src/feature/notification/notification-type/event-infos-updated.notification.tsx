import { Link } from 'react-router-dom';
import CoreNotification from '../core';
import { ArrowRight } from 'lucide-react';
import { Notification } from '../../../types';

function EventInfosUpdatedNotification({
  notification,
}: {
  notification: Notification;
}) {
  const originalMessage = notification.message;
  const splitWordOn = 'on';
  const splitWordIn = ', in';
  const firstPart = originalMessage.split(splitWordOn)[0];
  const secondPart = originalMessage.split(splitWordIn)[1];
  const dateRegex = /on\s(.*?),\s+in/;

  const buildMessage = () => {
    const date = originalMessage.match(dateRegex);
    if (date && date[1]) {
      return (
        <>
          {firstPart}
          {splitWordOn} <span className="font-medium text-dark">{date[1]}</span>
          {splitWordIn}
          {secondPart}
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
        className="self-end flex items-center gap-x-0.5 text-xxs font-semibold text-primary-1000 
        underline underline-offset-4 pr-4"
      >
        Go to event page
        <ArrowRight size={14} />
      </Link>
    </CoreNotification>
  );
}

export default EventInfosUpdatedNotification;
