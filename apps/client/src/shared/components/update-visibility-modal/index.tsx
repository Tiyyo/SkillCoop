import { useRef, useState } from 'react';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTrigger,
} from '../../../lib/ui/alert-dialog';
import { useUpdateSingleEvent } from '../../hooks/useSingleEvent';
import { Visibility } from '@skillcoop/types/src';
import { useEvent } from '../../../features/event-page/store/event.store';
import { updateEventSchema } from '@skillcoop/schema/src';
import { useTranslation } from 'react-i18next';

const menuItemStyle = `flex gap-2 items-center hover:bg-primary-200 
  transition-colors duration-300 rounded-lg px-2 text-md h-10`;

const baseButtonStyle = `inline-flex items-center justify-center 
rounded-md font-medium ring-offset-background 
transition-colors focus-visible:outline-none focus-visible:ring-2 
focus-visible:ring-ring focus-visible:ring-offset-2 
disabled:pointer-events-none disabled:opacity-50 text-primary-foreground 
hover:bg-primary/90 h-10 px-2.5 py-1 m-0 text-xs lg:text-sm`;

type UpdateVisibilityEventModalProps = {
  children: React.ReactNode;
  visibility: Visibility;
  eventId: number | undefined;
  profileId: string | undefined;
};

function UpdateVisibilityEventModal({
  children,
  visibility,
  eventId,
  profileId,
}: UpdateVisibilityEventModalProps) {
  const { t } = useTranslation('event');
  const closeModalRef = useRef(null);
  const { updateVisibility } = useEvent();
  const [nextVisibility, setNextVisibility] = useState<Visibility>(visibility);

  const goPublicText = t('goPublicEventText');
  const goPrivateText = t('goPrivateEventText');

  const { mutate: updateEventVisibility } = useUpdateSingleEvent({
    eventId: eventId,
    onSuccess: () => {
      console.log('visibility updated', nextVisibility);
      updateVisibility(nextVisibility);
      closeModal();
    },
  });

  function closeModal() {
    (closeModalRef.current as any).click();
  }

  function handleClickVisibility(event: React.MouseEvent<HTMLButtonElement>) {
    const value = event.currentTarget.value;
    if (!profileId || !value || !eventId) return;
    const updateData = {
      visibility: value as Visibility,
      event_id: eventId,
      profile_id: profileId,
    };
    const isValid = updateEventSchema.safeParse(updateData);
    if (!isValid.success) {
      console.error(isValid.error);
      return;
    }
    updateEventVisibility(updateData);
    setNextVisibility(value as Visibility);
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger className={menuItemStyle + ' h-10 w-full'}>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent
        className="w-4/5 rounded-lg border-border 
        bg-base-light text-text-base"
      >
        <AlertDialogCancel
          className="hidden"
          ref={closeModalRef}
        ></AlertDialogCancel>
        <AlertDialogDescription
          className="text-center 
          text-xs text-text-base lg:text-sm"
        >
          {visibility === 'public' ? goPrivateText : goPublicText}
        </AlertDialogDescription>
        <div
          className="my-4 flex flex-row 
                items-center justify-center gap-4"
        >
          <button
            value={visibility === 'public' ? 'private' : 'public'}
            name="statusName"
            type="button"
            className={
              baseButtonStyle + ' bg-primary-800 duration-200 hover:text-white'
            }
            onClick={handleClickVisibility}
          >
            {visibility === 'public' ? (
              <>{t('goPrivate')}</>
            ) : (
              <>{t('goPublic')}</>
            )}
          </button>
          <button
            name="statusName"
            type="button"
            className={baseButtonStyle + ' duration-300 hover:bg-primary-400'}
            onClick={() => closeModal()}
          >
            {t('cancel')}
          </button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default UpdateVisibilityEventModal;
