import { useMutation } from '@tanstack/react-query';
import { updateParticipantFn } from '../../../api/api.fn';
import { InvitationStatus, invitationStatus } from '../../../types';
import schema from 'schema';
import toast from '../../../utils/toast';
const { updateParticipantSchema } = schema;

interface CallToActionInvitationProps {
  userStatus?: InvitationStatus;
  eventId?: number;
  profileId?: number;
}

interface UpdateParticipantProps {
  event_id: number;
  profile_id: number;
  status_name: InvitationStatus;
}

function CallToActionInvitation({
  userStatus,
  eventId,
  profileId,
}: CallToActionInvitationProps) {
  const { mutate: updateParticipant } = useMutation(
    (data: UpdateParticipantProps) => updateParticipantFn(data)
  );

  //  Should be abstract to another hook
  const handleClickInvitation = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
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
    }
  };

  return (
    <>
      {userStatus === 'pending' && (
        <div className=" text-xs text-center self-start">
          <p>You have been invited to this event</p>
          <p>Do you want to confirm your participation</p>
          <p>in this event?</p>
          <div className="flex gap-3 justify-center py-1">
            <button
              value="confirmed"
              className="py-1.5 bg-primary-700 px-2.5 rounded-md shadow-lg font-semibold"
              onClick={handleClickInvitation}>
              Yes
            </button>
            <button
              value="declined"
              className="py-1.5 bg-white px-2.5 rounded-md shadow-md font-semibold"
              onClick={handleClickInvitation}>
              No
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default CallToActionInvitation;
