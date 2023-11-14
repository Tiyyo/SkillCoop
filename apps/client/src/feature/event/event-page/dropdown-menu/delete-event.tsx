import { Trash2 } from 'lucide-react';
import MenuItemDialog from '../../../../component/menu-item-dialog';
import { useDeleteSingleEvent } from '../../../../hooks/useSingleEvent';

interface DeleteEventMenuItemProps {
  isAdmin: boolean;
  eventId?: number;
  profileId?: number;
}

function DeleteEventMenuItem({
  isAdmin,
  eventId,
  profileId,
}: DeleteEventMenuItemProps) {
  const { mutate: deleteEvent } = useDeleteSingleEvent({ eventId });
  if (!isAdmin) return null;
  return (
    <MenuItemDialog
      mutateFn={deleteEvent}
      mutationData={{ event_id: eventId, profile_id: profileId }}
      description={`This action cannot be undone. 
                his will permanently delete your event.`}
      redirection="/"
    >
      <div className="text-error flex items-center gap-2">
        <Trash2 size="16" />
        <span>Delete</span>
      </div>
    </MenuItemDialog>
  );
}

export default DeleteEventMenuItem;
