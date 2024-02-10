import { Trash2 } from 'lucide-react';
import MenuItemDialog from '../../../shared/components/menu-item-dialog';
import { useDeleteSingleEvent } from '../../../shared/hooks/useSingleEvent';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation('event');
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
      description={
        t('system:thisActionCannotBeUndone') + ' ' + t('thisWillDeleteTheEvent')
      }
      hoverOn
    >
      <div className="flex items-center gap-2 text-error">
        <Trash2 size="16" />
        <span>{t('delete')}</span>
      </div>
    </MenuItemDialog>
  );
}

export default DeleteEventMenuItem;
