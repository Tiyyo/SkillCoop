import { Link } from 'react-router-dom';
import { EventStatus } from '../../../../types';
import { UserPlus } from 'lucide-react';
import { DropdownMenuItem } from '../../../../lib/ui/dropdown';

function InviteFriendsMeuItems({
  eventStatus,
  eventId,
}: {
  eventStatus: EventStatus;
  eventId?: number;
}) {
  return (
    <>
      {eventStatus !== 'completed' && eventId && (
        <DropdownMenuItem
          className="w-full hover:bg-primary-200 
    transition-colors duration-300 rounded-lg px-2 text-md h-10"
        >
          <Link
            to="invitation"
            state={{ eventId, variant: 'mutate' }}
            // className={menuItemStyle}
            className="flex items-center gap-2"
          >
            <UserPlus size={16} />
            <p>Invite friends</p>
          </Link>
        </DropdownMenuItem>
      )}
    </>
  );
}

export default InviteFriendsMeuItems;
