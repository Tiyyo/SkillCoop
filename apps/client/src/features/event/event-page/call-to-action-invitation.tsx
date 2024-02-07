import type { EventStatus } from '@skillcoop/types/src';
import { invitationStatus } from '@skillcoop/types/src';
import { updateParticipantSchema } from '@skillcoop/schema/src';
import toast from '../../../utils/toast';
import { useEvent } from '../../../stores/event.store';
import { useUpdateParticipant } from '../../../hooks/useSingleEvent';
import Container from '../../../layouts/container';
import LeftBorder from '../../../components/left-border';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation('event');
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
      toast.error(t('thisEventisFull'));
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
      toast.error(t('system:somethingWentWrong'));
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
        <Container className="flex w-full justify-between py-2 lg:rounded-lg">
          <LeftBorder />
          <div
            className="ml-2 flex w-full flex-col items-center 
            self-start text-xs lg:flex-row"
          >
            <p className="mx-1">{t('youHaveBeenInvited')}</p>
            <span>{'    '}</span>
            <p className="mr-2">{t('wouldYouLikeToParticipate')}</p>
            <div className="flex justify-center gap-3 py-1">
              <button
                value="confirmed"
                className="rounded-md bg-primary-700 px-2.5 py-1.5 
                font-semibold shadow-lg"
                onClick={handleClickInvitation}
              >
                Yes
              </button>
              <button
                value="declined"
                className="rounded-md bg-white px-2.5 py-1.5 
                font-semibold shadow-md"
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
