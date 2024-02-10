import { FolderInput } from 'lucide-react';
import { DropdownMenuItem } from '../../../lib/ui/dropdown';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

type TransfertOwnershipMenuItemProps = {
  isAdmin: boolean;
};
const menuItemStyle = `flex gap-2 items-center hover:bg-primary-200 
    transition-colors duration-300 rounded-lg px-2 text-md h-10`;

function TransfertOwnershipMenuItem({
  isAdmin,
}: TransfertOwnershipMenuItemProps) {
  const { t } = useTranslation('event');
  if (!isAdmin) return null;
  return (
    <DropdownMenuItem className={menuItemStyle}>
      <FolderInput size="16" />
      <Link to="ownership">
        <span>{t('transfertOwnership')}</span>
      </Link>
    </DropdownMenuItem>
  );
}

export default TransfertOwnershipMenuItem;
