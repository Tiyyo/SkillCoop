import { useMutation } from '@tanstack/react-query';
import MenuItemDialog from '../../../component/menu-item-dialog';
import {
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuTrigger,
} from '../../../lib/ui/dropdown';
import { Trash2, Dices, FolderInput } from 'lucide-react';
import { deleteEventFn, generateTeamsFn } from '../../../api/api.fn';
import UpdateStatusModal from '../../../component/update-status-modal';
import { Link } from 'react-router-dom';

interface DropdownEventMenuProps {
  eventStatus?: string;
  eventId?: number;
  profileId?: number;
  isAdmin?: boolean;
}

function DropdownEventMenu({
  eventId,
  profileId,
  isAdmin,
  eventStatus = 'open',
}: DropdownEventMenuProps) {
  const { mutate: deleteEvent } = useMutation(
    (data: { eventId: number; profileId: number }) => deleteEventFn(data),
  );
  const { mutate: generateTeams } = useMutation((eventId: number) =>
    generateTeamsFn(eventId),
  );

  const handleClickGenerateTeams = () => {
    if (!eventId) return;
    generateTeams(eventId);
    window.location.reload();
  };

  const menuItemStyle = `flex gap-2 items-center hover:bg-primary-200 
    transition-colors duration-300 rounded-lg px-2 text-md`;
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="py-2">
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
          {eventStatus !== 'completed' && (
            <UpdateStatusModal eventId={eventId} profileId={profileId}>
              <FolderInput size="16" />
              <span>Revoke participation</span>
            </UpdateStatusModal>
          )}
          {isAdmin && (
            <>
              {eventStatus === 'full' && (
                <DropdownMenuItem className={menuItemStyle}>
                  <Dices size="16" />
                  <button onClick={handleClickGenerateTeams}>
                    Generate teams
                  </button>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem className={menuItemStyle}>
                <FolderInput size="16" />
                <Link to="ownership">
                  <span>Transfert ownership</span>
                </Link>
              </DropdownMenuItem>
              <MenuItemDialog
                mutateFn={deleteEvent}
                mutationData={{ eventId, profileId }}
                description={`This action cannot be undone. 
                his will permanently delete your event.`}
                redirection="/"
              >
                <div className="text-error flex items-center gap-2">
                  <Trash2 size="16" />
                  <span>Delete</span>
                </div>
              </MenuItemDialog>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default DropdownEventMenu;
