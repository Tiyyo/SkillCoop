import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../../../lib/ui/alert-dialog';
import { useEvent } from '../../../features/event-page/store/event.store';
import { InvitationStatus, invitationStatus } from '@skillcoop/types/src';
import { useRef, useState } from 'react';
import { X } from 'lucide-react';
import { useUpdateParticipant } from '../../../shared/hooks/useSingleEvent';
import toast from '../../../shared/utils/toast';
import { useTranslation } from 'react-i18next';

type UpdateStatusModalProps = {
  children?: React.ReactNode;
  eventId: number | undefined;
  profileId: number | undefined;
};

const menuItemStyle = `flex gap-2 items-center hover:bg-primary-200 
  transition-colors duration-300 rounded-lg px-2 text-md h-10`;

const baseButtonStyle = `inline-flex items-center justify-center 
rounded-md text-sm font-medium ring-offset-background 
transition-colors focus-visible:outline-none focus-visible:ring-2 
focus-visible:ring-ring focus-visible:ring-offset-2 
disabled:pointer-events-none disabled:opacity-50 text-primary-foreground 
hover:bg-primary/90 h-10 px-4 py-2 m-0;`;

function UpdateStatusModal({
  children,
  eventId,
  profileId,
}: UpdateStatusModalProps) {
  const { t } = useTranslation('event');
  const { updateUserStatus: updateUserStatusInStore, updateParticipantStatus } =
    useEvent();
  const [nextStatus, setNextStatus] = useState<InvitationStatus | null>(null);
  const [isOrganizer, setIsOrganizer] = useState(false);
  const closeModalRef = useRef(null);

  const { mutate: updateUserStatusInDb } = useUpdateParticipant({
    eventId,
    onSuccess: (response: any) => {
      if (!nextStatus) return;
      if (response === 'Organizer cannot change his status') {
        setIsOrganizer(true);
        return;
      }
      if (response === 'Event is already completed') {
        toast.error(t('toast:eventIsCompleted'));
      }
      if (response === 'Status has been updated') {
        updateUserStatusInStore(nextStatus);
        if (profileId) updateParticipantStatus(nextStatus, profileId);
        (closeModalRef.current as any).click();
      }
    },
  });

  const handleClickStatus = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!eventId || !profileId) return;
    const data = {
      event_id: eventId,
      profile_id: profileId,
      status_name: e.currentTarget.value as InvitationStatus,
    };
    // TODO: instert zod validation here
    updateUserStatusInDb(data);
    setNextStatus(e.currentTarget.value as InvitationStatus);
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger className={menuItemStyle + ' h-10 w-full'}>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent
        className="w-4/5 rounded-lg border-border 
        bg-base-light text-text-base"
      >
        <div className="w-full text-right">
          <AlertDialogCancel className="m-0 border-none" ref={closeModalRef}>
            <X size={18} />
          </AlertDialogCancel>
        </div>
        <div className="flex flex-col items-center">
          {isOrganizer ? (
            <>
              <p className="my-2 text-center">
                {t('youCannotRevokeYourParticipation')}
              </p>
              <p className="text-center">{t('youHaveToTransferOwnership')}</p>
            </>
          ) : (
            <>
              <AlertDialogHeader>
                <AlertDialogTitle className="text-center">
                  {t('doYouWantToStayInvited')}
                </AlertDialogTitle>
                <AlertDialogDescription className="text-center">
                  {t('ifNoYouWillNoLonger')}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div
                className="my-4 flex flex-row 
                items-center justify-center gap-4"
              >
                <button
                  value={invitationStatus.pending}
                  name="statusName"
                  type="button"
                  className={
                    baseButtonStyle +
                    ' bg-primary-800 duration-200 hover:text-white'
                  }
                  onClick={handleClickStatus}
                >
                  {t('yesIdo')}
                </button>
                <button
                  value={invitationStatus.declined}
                  name="statusName"
                  type="button"
                  className={
                    baseButtonStyle + ' duration-300 hover:bg-primary-400'
                  }
                  onClick={handleClickStatus}
                >
                  {t('noIdont')}
                </button>
              </div>
            </>
          )}
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default UpdateStatusModal;
