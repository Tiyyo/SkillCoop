import {
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuTrigger,
} from '../../../../lib/ui/dropdown';
import RevokeParticipationMenuItem from './revoke-participation';
import type { EventStatus } from '@skillcoop/types/src';
import GenerateTeamsMenuItem from './generate-teams';
import TransfertOwnershipMenuItem from './transfert-ownership';
import DeleteEventMenuItem from './delete-event';
import CancelEventMenuItem from './cancel-event';
import InviteFriendsMeuItems from './Invite-friends';

type DropdownEventMenuProps = {
  eventStatus?: EventStatus | null;
  eventId?: number;
  profileId?: number;
  isAdmin?: boolean;
};

const eventStatusWithAuthorizeAction = ['open', 'full'];

function DropdownEventMenu({
  eventId,
  profileId,
  isAdmin = false,
  eventStatus = 'open',
}: DropdownEventMenuProps) {
  if (!isAdmin && !eventStatusWithAuthorizeAction.includes(eventStatus ?? ''))
    return null;
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="basis-[34px] py-2">
          <svg
            className="h-5 w-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 4 15"
          >
            <path
              d={`M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 
            6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 
            1 1-3 0 1.5 1.5 0 0 1 3 0Z`}
            />
          </svg>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className={`z-10 mx-2 flex 
          flex-col border border-border bg-base-light text-text-base`}
        >
          <InviteFriendsMeuItems eventStatus={eventStatus} eventId={eventId} />
          <RevokeParticipationMenuItem
            eventStatus={eventStatus}
            eventId={eventId}
            profileId={profileId}
          />
          <GenerateTeamsMenuItem
            isAdmin={isAdmin}
            eventStatus={eventStatus}
            eventId={eventId}
          />
          <TransfertOwnershipMenuItem isAdmin={isAdmin} />
          <CancelEventMenuItem
            eventStatus={eventStatus}
            isAdmin={isAdmin}
            eventId={eventId}
            profileId={profileId}
          />
          <DeleteEventMenuItem
            isAdmin={isAdmin}
            eventId={eventId}
            profileId={profileId}
          />
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default DropdownEventMenu;
