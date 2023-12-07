import { useUpdateParticipant } from '../../../hooks/useSingleEvent';
import { InvitationStatus, invitationStatus } from '../../../types';
import CoreNotification from '../core';
import { Notification } from '../dispatch';

function EventInvitationNotification({
  notification,
}: {
  notification: Notification;
}) {
  const { mutate: updateParticipantStatus } = useUpdateParticipant({
    eventId: notification.event_id,
    onSuccess: () => {
      // should update the state of the notification
      // for not display action if user has respond to the invitation
      // we gonna consider that if user has read the notification
      // he has respond to the invitation
      console.log('success');
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

  const buildMessage = () => {
    if (username) {
      const firstPart = originalMessage.split(username)[0];
      const restOfMessage = originalMessage.split(username)[1];
      const splitWordEvent = 'event on';
      const secondPart = restOfMessage.split(splitWordEvent)[0];
      const date = restOfMessage.split(splitWordEvent)[1];
      return (
        <>
          {firstPart}
          <span className="font-medium text-dark">{username}</span>
          {secondPart}
          {splitWordEvent}
          <span className="font-medium text-dark">{date}</span>
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
      username={username}
      message={buildMessage()}
    >
      <div className="flex gap-x-2.5">
        <button
          className="px-2 py-1 bg-primary-400 rounded-md"
          value={invitationStatus.confirmed}
          onClick={handleClickActionOnInvition}
        >
          Accept
        </button>
        <button
          className="px-2 py-1 bg-primary-210"
          value={invitationStatus.declined}
          onClick={handleClickActionOnInvition}
        >
          Decline
        </button>
      </div>
    </CoreNotification>
  );
}

export default EventInvitationNotification;
