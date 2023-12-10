import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../../lib/ui/alert-dialog';
import { useEvent } from '../../store/event.store';
import { InvitationStatus, invitationStatus } from '../../types/index';
import { useState } from 'react';
import { X } from 'lucide-react';
import { useUpdateParticipant } from '../../hooks/useSingleEvent';
import toast from '../../utils/toast';

type UpdateStatusModalProps = {
  children?: React.ReactNode;
  eventId: number | undefined;
  profileId: number | undefined;
};

const menuItemStyle = `flex gap-2 items-center hover:bg-primary-200 transition-colors 
          duration-300 rounded-lg px-2 text-md h-10`;

const baseButtonStyle = `inline-flex items-center justify-center 
rounded-md text-sm font-medium ring-offset-background 
transition-colors focus-visible:outline-none focus-visible:ring-2 
focus-visible:ring-ring focus-visible:ring-offset-2 
disabled:pointer-events-none disabled:opacity-50 text-primary-foreground 
hover:bg-primary/90 h-10 w-24 py-2 m-0;`;

function UpdateStatusModal({
  children,
  eventId,
  profileId,
}: UpdateStatusModalProps) {
  const { updateUserStatus: updateUserStatusInStore } = useEvent();
  const [nextStatus, setNextStatus] = useState<InvitationStatus | null>(null);
  const [isOrganizer, setIsOrganizer] = useState(false);

  const { mutate: updateUserStatusInDb } = useUpdateParticipant({
    eventId,
    onSuccess: (response: any) => {
      if (!nextStatus) return;
      if (response?.message === 'Organizer cannot change his status') {
        setIsOrganizer(true);
        return;
      }
      if (response?.message) {
        updateUserStatusInStore(nextStatus);
      }
      if (response?.message === 'Event is already completed') {
        toast.error('Event is already completed');
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
      <AlertDialogTrigger className={menuItemStyle + 'w-full h-10'}>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-base-light w-4/5 rounded-lg ">
        <div className="w-full text-right">
          <AlertDialogCancel className="border-none m-0">
            <X size={18} />
          </AlertDialogCancel>
        </div>
        <div className="flex flex-col items-center">
          {isOrganizer ? (
            <>
              <p className="text-center my-2">
                You cannot revoke your participation in this event as you are
                the organizer.
              </p>
              <p className="text-center">
                You have to transfer your ownership to another participant first
              </p>
            </>
          ) : (
            <>
              <AlertDialogHeader>
                <AlertDialogTitle className="text-center">
                  Do you want to stay invited ?
                </AlertDialogTitle>
                <AlertDialogDescription className="text-center">
                  If not you will no longer have access to this event
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="flex flex-row items-center justify-center gap-4 my-4">
                <button
                  value={invitationStatus.pending}
                  name="statusName"
                  type="button"
                  className={
                    baseButtonStyle +
                    ' bg-primary-800 hover:text-white duration-200'
                  }
                  onClick={handleClickStatus}
                >
                  Yes, I do
                </button>
                <button
                  value={invitationStatus.declined}
                  name="statusName"
                  type="button"
                  className={
                    baseButtonStyle + ' hover:bg-primary-400 duration-300'
                  }
                  onClick={handleClickStatus}
                >
                  No, I don't
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
