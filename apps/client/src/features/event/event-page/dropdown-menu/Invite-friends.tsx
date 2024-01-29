import { Link } from 'react-router-dom';
import type { EventStatus } from '@skillcoop/types/src';
import { UserPlus } from 'lucide-react';
import { DropdownMenuItem } from '../../../../lib/ui/dropdown';
import { useTranslation } from 'react-i18next';

function InviteFriendsMeuItems({
  eventStatus,
  eventId,
}: {
  eventStatus: EventStatus | null;
  eventId?: number;
}) {
  const { t } = useTranslation('event');
  return (
    <>
      {eventStatus !== 'completed' && eventId && (
        <DropdownMenuItem
          className="h-10 w-full 
    rounded-lg px-2 text-md transition-colors duration-300 hover:bg-primary-200"
        >
          <Link
            to="invitation"
            state={{ eventId, variant: 'mutate' }}
            className="flex items-center gap-2"
          >
            <UserPlus size={16} />
            <p>{t('inviteFriends')}</p>
          </Link>
        </DropdownMenuItem>
      )}
    </>
  );
}

export default InviteFriendsMeuItems;
