import { invitationStatus } from '../../../types';
import { updateParticipantSchema } from 'schema/ts-schema';
import toast from '../../../utils/toast';
import { useEvent } from '../../../store/event.store';
import { useUpdateParticipant } from '../../../hooks/useSingleEvent';

interface CallToActionInvitationProps {
  eventId?: number;
  profileId?: number;
}

function CallToActionInvitation({
  eventId,
  profileId,
}: CallToActionInvitationProps) {
  const { mutate: updateParticipant } = useUpdateParticipant({ eventId });

  const { data: event, updateUserStatus } = useEvent();
  const handleClickInvitation = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
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
      updateParticipant(data);
      updateUserStatus(status);
    }
  };

  return (
    <>
      {event.user_status === 'pending' && (
        <div className=" text-xs text-center self-start">
          <p>You have been invited to this event</p>
          <p>Would you like to confirm your participation ?</p>
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
      )}
    </>
  );
}

export default CallToActionInvitation;
