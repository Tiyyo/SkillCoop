import { NavLink, useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../lib/ui/dropdown';
import { User, Trophy, Settings, LogOut } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { logoutUserFn } from '../../api/api.fn';
import { useApp } from '../../store/app.store';
import { queryClient } from '../../main';
import { useEffect } from 'react';

function NavUser({ children }: { children: JSX.Element }) {
  const navigate = useNavigate();
  const menuItemStyle = `'flex gap-2 items-center hover:bg-primary-200 transition-colors 
          duration-300 rounded-lg px-2 text-md'`;

  const {
    mutate: logout,
    isSuccess,
    isLoading,
  } = useMutation(() => logoutUserFn());
  const { signout } = useApp();

  const handleClickLogout = async () => {
    signout();
    logout();
  };
  useEffect(() => {
    if (isSuccess) {
      // cache need to be clear on logout to avoid an user to still be able to access the app
      // because of remaining data in cache
      queryClient.clear();
      queryClient.invalidateQueries({ queryKey: ['authUser'] });
      queryClient.removeQueries({ queryKey: ['authUser'], exact: true });
      navigate('/login');
    }
  }, [isLoading]);

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
          <DropdownMenuItem
            className={menuItemStyle}
            onClick={handleClickLogout}
          >
            <LogOut size={16} />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default NavUser;
