import {
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuTrigger,
} from '../../lib/ui/dropdown';
import { Trash2, Dices, FolderInput } from 'lucide-react';

interface DropdownEventMenuProps {
  eventId?: number;
  profileId?: number;
  isAdmin?: boolean;
}

function DropdownEventMenu({
  eventId,
  profileId,
  isAdmin,
}: DropdownEventMenuProps) {
  const menuItemStyle =
    'flex gap-2 items-center hover:bg-primary-200 transition-colors duration-300 rounded-lg px-2 text-md';
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="py-2">
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 4 15">
            <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
          </svg>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-base-light mx-2 border z-10">
          {isAdmin && <DropdownMenuItem></DropdownMenuItem>}
          <DropdownMenuItem className={menuItemStyle}>
            <Dices size="16" />
            <span>Generate teams</span>
          </DropdownMenuItem>
          <DropdownMenuItem className={menuItemStyle}>
            <FolderInput size="16" />
            <span>Transfert ownership</span>
          </DropdownMenuItem>
          <DropdownMenuItem className={menuItemStyle}>
            <Trash2 size="16" />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default DropdownEventMenu;
