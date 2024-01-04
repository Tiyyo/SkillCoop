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

function NavUser({ children }: { children: JSX.Element }) {
  const { logout } = useLogout();

  const menuItemStyle = `'flex gap-2 items-center 
        hover:bg-primary-200 transition-colors duration-300 
        rounded-lg px-2 text-md'`;

  return (
    <div className="relative  flex justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
        <DropdownMenuContent className="bg-base-light mx-2">
          <NavLink to="/user/profile">
            <DropdownMenuItem className={menuItemStyle}>
              <User size={16} />
              <span>Profile</span>
            </DropdownMenuItem>
          </NavLink>
          <NavLink to="/user/skills">
            <DropdownMenuItem className={menuItemStyle}>
              <Trophy size={16} />
              <span>Skills</span>
            </DropdownMenuItem>
          </NavLink>
          <NavLink to="/user/settings">
            <DropdownMenuItem className={menuItemStyle}>
              <Settings size={16} />
              <span>Settings</span>
            </DropdownMenuItem>
          </NavLink>
          <DropdownMenuSeparator className="bg-light" />
          <DropdownMenuItem className={menuItemStyle} onClick={() => logout()}>
            <LogOut size={16} />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default NavUser;
