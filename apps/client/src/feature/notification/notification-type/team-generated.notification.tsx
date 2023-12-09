import { Link } from 'react-router-dom';
import CoreNotification from '../core';
import { Notification } from '../dispatch';
import { ArrowRight } from 'lucide-react';

function TeamGeneratedNotification({
  notification,
}: {
  notification: Notification;
}) {
  const dateRegex = /scheduled on\s(.*?)\s+has/;
  const date = notification.message.match(dateRegex)?.[1];
  const buildMessage = () => {
    if (date) {
      const firstPart = notification.message.split(date)[0];
      const secondPart = notification.message.split(date)[1];
      return (
        <>
          {firstPart}
          <span className="font-medium text-dark">{date}</span>
          {secondPart}
        </>
      );
    }
    return notification.message;
  };

  return (
    <CoreNotification
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

export default TeamGeneratedNotification;