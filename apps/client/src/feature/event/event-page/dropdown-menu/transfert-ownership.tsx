import { FolderInput } from 'lucide-react';
import { DropdownMenuItem } from '../../../../lib/ui/dropdown';
import { Link } from 'react-router-dom';

interface TransfertOwnershipMenuItemProps {
  isAdmin: boolean;
}
const menuItemStyle = `flex gap-2 items-center hover:bg-primary-200 
    transition-colors duration-300 rounded-lg px-2 text-md h-10`;

function TransfertOwnershipMenuItem({
  isAdmin,
}: TransfertOwnershipMenuItemProps) {
  if (!isAdmin) return null;
  return (
    <DropdownMenuItem className={menuItemStyle}>
      <FolderInput size="16" />
      <Link to="ownership">
        <span>Transfert ownership</span>
      </Link>
    </DropdownMenuItem>
  );
}

export default TransfertOwnershipMenuItem;
