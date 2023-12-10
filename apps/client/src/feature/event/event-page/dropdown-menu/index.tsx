import {
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuTrigger,
} from '../../../../lib/ui/dropdown';
import RevokeParticipationMenuItem from './revoke-participation';
import { EventStatus } from '../../../../types';
import GenerateTeamsMenuItem from './generate-teams';
import TransfertOwnershipMenuItem from './transfert-ownership';
import DeleteEventMenuItem from './delete-event';
import CancelEventMenuItem from './cancel-event';
import InviteFriendsMeuItems from './Invite-friends';

type DropdownEventMenuProps = {
  eventStatus?: EventStatus;
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
  if (!isAdmin && !eventStatusWithAuthorizeAction.includes(eventStatus))
    return null;
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="py-2 basis-[34px]">
          <svg
            className="w-5 h-5"
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
          className={`bg-base-light mx-2 border 
          z-10 flex flex-col`}
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
