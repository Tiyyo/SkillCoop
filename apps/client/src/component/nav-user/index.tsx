import { NavLink } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../lib/ui/dropdown';
import { User, Trophy, Settings, LogOut } from 'lucide-react';
import useLogout from '../../hooks/useLogout';
import { useTranslation } from 'react-i18next';

function NavUser({ children }: { children: JSX.Element }) {
  const { t } = useTranslation('system');
  const { logout } = useLogout();

  const menuItemStyle = `'flex gap-2 items-center 
        hover:bg-primary-200 transition-colors duration-300 
        rounded-lg px-2 text-md'`;

  return (
    <div className="relative  flex justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
        <DropdownMenuContent className="bg-base-light mx-2">
          <NavLink to="/home/user/profile">
            <DropdownMenuItem className={menuItemStyle}>
              <User size={16} />
              <span>{t('profile')}</span>
            </DropdownMenuItem>
          </NavLink>
          <NavLink to="/home/user/skills">
            <DropdownMenuItem className={menuItemStyle}>
              <Trophy size={16} />
              <span>{t('skills')}</span>
            </DropdownMenuItem>
          </NavLink>
          <NavLink to="/home/user/settings">
            <DropdownMenuItem className={menuItemStyle}>
              <Settings size={16} />
              <span>{t('settings')}</span>
            </DropdownMenuItem>
          </NavLink>
          <DropdownMenuSeparator className="bg-light" />
          <DropdownMenuItem className={menuItemStyle} onClick={() => logout()}>
            <LogOut size={16} />
            <span>{t('logout')}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default NavUser;
