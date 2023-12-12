import { EventStatus, invitationStatus } from '../../../types';
import { updateParticipantSchema } from 'schema/ts-schema';
import toast from '../../../utils/toast';
import { useEvent } from '../../../store/event.store';
import { useUpdateParticipant } from '../../../hooks/useSingleEvent';
import Container from '../../../layout/container';
import LeftBorder from '../../../component/left-border';

type CallToActionInvitationProps = {
  eventId?: number;
  profileId?: number;
  eventStatus?: EventStatus | null;
};

function CallToActionInvitation({
  eventId,
  profileId,
  eventStatus,
}: CallToActionInvitationProps) {
  const { mutate: updateParticipantDb } = useUpdateParticipant({
    eventId,
  });

  const {
    data: event,
    updateUserStatus,
    updateParticipantStatus: updateParticipantsStore,
  } = useEvent();
  const handleClickInvitation = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    if (eventStatus === 'full') {
      toast.error('This event is full, you cannot join it');
      return;
    }
    const status = (e.target as HTMLButtonElement).value;
    if (!profileId || !eventId) return;
    const data = {
      event_id: eventId,
      profile_id: profileId,
      status_name: invitationStatus[status as keyof typeof invitationStatus],
    };
    const isValid = updateParticipantSchema.safeParse(data);
    if (!isValid.success) {
      toast.error('Something went wrong..., Try again later');
    } else {
      updateParticipantDb(data);
      updateUserStatus(status);
      updateParticipantsStore(
        invitationStatus[status as keyof typeof invitationStatus],
        profileId,
      );
    }
  };

  return (
    <>
      {event.user_status === 'pending' && (
        <Container className="flex justify-between w-full py-2">
          <LeftBorder />
          <div
            className="w-full ml-2 flex flex-col lg:flex-row 
            items-center text-xs self-start"
          >
            <p className="mx-1">You have been invited to this event.</p>
            <span>{'    '}</span>
            <p className="mr-2">
              Would you like to confirm your participation ?
            </p>
            <div className="flex gap-3 justify-center py-1">
              <button
                value="confirmed"
                className="py-1.5 bg-primary-700 px-2.5 rounded-md shadow-lg font-semibold"
                onClick={handleClickInvitation}
              >
                Yes
              </button>
              <button
                value="declined"
                className="py-1.5 bg-white px-2.5 rounded-md shadow-md font-semibold"
                onClick={handleClickInvitation}
              >
                No
              </button>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}

export default CallToActionInvitation;
