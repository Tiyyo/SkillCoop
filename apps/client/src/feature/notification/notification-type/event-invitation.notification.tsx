import { useUpdateParticipant } from '../../../hooks/useSingleEvent';
import type { InvitationStatus, Notification } from '@skillcoop/types/src';
import { invitationStatus } from '@skillcoop/types/src';
import CoreNotification from '../core';
import { useTranslation } from 'react-i18next';

import { getCurrentLngInLocalStorage } from '../../../utils/get-current-lng';

function EventInvitationNotification({
  notification,
}: {
  notification: Notification;
}) {
  const { t } = useTranslation('notification');
  const currentLng = getCurrentLngInLocalStorage();
  const { mutate: updateParticipantStatus } = useUpdateParticipant({
    eventId: notification.event_id,
    onSuccess: () => {
      // should update the state of the notification
      // for not display action if user has respond to the invitation
      // we gonna consider that if user has read the notification
      // he has respond to the invitation
    },
  });

  const handleClickActionOnInvition = (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    if (!notification.event_id) return;
    // couldnt satisfy compiler without casting
    const status = (e.target as HTMLButtonElement).value as InvitationStatus;
    updateParticipantStatus({
      event_id: notification.event_id,
      profile_id: notification.profile_id,
      status_name: status,
    });
  };
  const originalMessage = notification.message;
  const usernameRegex = /by\s(.*?)\s+to/;
  const username = originalMessage.match(usernameRegex)?.[1];

  const translateDate = (englishDate: string) => {
    const splitWord = 'at';
    const date = englishDate.split(splitWord)[0];
    const time = englishDate.split(splitWord);
    const eventDate = new Date(date);
    const localDate = eventDate.toLocaleString(`${currentLng}-US`, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    return `${localDate} ${t('event:at')} ${time}`;
  };

  const buildMessage = () => {
    if (username) {
      const restOfMessage = originalMessage.split(username)[1];
      const splitWordEvent = 'event on';
      const date = restOfMessage.split(splitWordEvent)[1];
      return (
        <>
          {/* {firstPart} */}
          {t('youHaveBeenInvitedBy')}{' '}
          <span className="font-medium text-dark">{username} </span>
          {t('toTheEvent')}{' '}
          <span className="font-medium text-dark">{translateDate(date)}</span>
        </>
      );
    }
    return originalMessage;
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
          {t('system:accept')}
        </button>
        <button
          className="px-2 py-1 bg-primary-210"
          value={invitationStatus.declined}
          onClick={handleClickActionOnInvition}
        >
          {t('system:decline')}
        </button>
      </div>
    </CoreNotification>
  );
}

export default EventInvitationNotification;
