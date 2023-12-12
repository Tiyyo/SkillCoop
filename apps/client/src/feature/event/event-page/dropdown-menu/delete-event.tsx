import { Trash2 } from 'lucide-react';
import MenuItemDialog from '../../../../component/menu-item-dialog';
import { useDeleteSingleEvent } from '../../../../hooks/useSingleEvent';
import { useNavigate } from 'react-router-dom';

type DeleteEventMenuItemProps = {
  isAdmin: boolean;
  eventId?: number;
  profileId?: number;
};

function DeleteEventMenuItem({
  isAdmin,
  eventId,
  profileId,
}: DeleteEventMenuItemProps) {
  const navigate = useNavigate();
  const { mutate: deleteEvent } = useDeleteSingleEvent({
    eventId,
    // window reload is necessary to update the event list
    // but it's not realy user friendly
    // try to refetch the event list instead
    onSuccess: () => {
      navigate(-1);
      // window.location.reload();
    },
  });
  if (!isAdmin) return null;
  return (
    <MenuItemDialog
      mutateFn={deleteEvent}
      mutationData={{ event_id: eventId, profile_id: profileId }}
      description={`This action cannot be undone. 
                his will permanently delete your event.`}
      hoverOn
    >
      <div className="text-error flex items-center gap-2">
        <Trash2 size="16" />
        <span>Delete</span>
      </div>
    </MenuItemDialog>
  );
}

export default DeleteEventMenuItem;
