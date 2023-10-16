import { NavLink } from 'react-router-dom';
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

function NavUser({ userAvatar }: { userAvatar?: string | null }) {
  const menuItemStyle =
    'flex gap-2 items-center hover:bg-primary-200 transition-colors duration-300 rounded-lg px-2 text-md';

  const { mutate: logout } = useMutation(() => logoutUserFn());
  const { setIsAuth } = useApp();

  const handleClickLogout = () => {
    setIsAuth(false);
    logout();
    // cache need to be clear on logout to avoid an user to still be able to access the app
    // because of remaining data in cache
    queryClient.clear();
    queryClient.resetQueries({ queryKey: ['authUser'], exact: true });
    queryClient.setQueryDefaults(['authUser'], { initialData: {} });
  };

  return (
    <div className="relative  flex justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="rounded-full overflow-hidden w-8 h-8 shadow-md  ">
            <img
              src={'/images/PlayerDefaultIcon.svg'}
              className="rounded-full"
              alt="user avatar"
            />
          </div>
        </DropdownMenuTrigger>
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
            onClick={handleClickLogout}>
            <LogOut size={16} />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default NavUser;
