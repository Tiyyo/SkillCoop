import { Ban } from 'lucide-react';
import MenuItemDialog from '../../../../component/menu-item-dialog';
import { useUpdateSingleEvent } from '../../../../hooks/useSingleEvent';
import { EventStatus, eventStatus as eventStatusType } from '@skillcoop/types';
import { useEvent } from '../../../../store/event.store';

type CancelEventMenuItemProps = {
  isAdmin: boolean;
  eventId?: number;
  profileId?: number;
  eventStatus: EventStatus | null;
};

function CancelEventMenuItem({
  isAdmin,
  eventId,
  profileId,
  eventStatus,
}: CancelEventMenuItemProps) {
  const { updateStatusName } = useEvent();
  const { mutate: cancelEvent } = useUpdateSingleEvent({
    eventId,
    onSuccess: () => {
      updateStatusName(eventStatusType.cancelled);
      window.location.reload();
    },
  });
  if (
    eventStatus === eventStatusType.completed ||
    eventStatus === eventStatusType.cancelled
  )
    return null;
  if (!isAdmin) return null;
  return (
    <MenuItemDialog
      mutateFn={cancelEvent}
      mutationData={{
        event_id: eventId,
        profile_id: profileId,
        status_name: 'cancelled',
      }}
      description={`This action cannot be undone. 
                this will permanently delete your event.`}
      hoverOn
    >
      <div className="flex items-center gap-2">
        <Ban size="16" />
        <span>Cancel</span>
      </div>
    </MenuItemDialog>
  );
}

export default CancelEventMenuItem;
