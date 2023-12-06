import Hamburger from '../hamburger';
import { useState } from 'react';
import MobileNav from '../mobile-nav';
import NavUser from '../nav-user';
import { ChevronDown } from 'lucide-react';
import Avatar from '../avatar';
import notificationBellIcon from '../../assets/svg/notification-bell.svg';
import settingsIcon from '../../assets/svg/settings-wheel.svg';
import { useApp } from '../../store/app.store';
import NotificationContainer from '../../feature/notification';
import { Link } from 'react-router-dom';

function Header() {
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
  const getOpenStateMobileMenu = (state: boolean) => {
    setMenuIsOpen(state);
  };
  const { userProfile } = useApp();

  return (
    <div
      className="flex justify-between bg-base-light w-full h-20 py-3 
      lg:rounded-lg lg:mt-2 shadow-md lg:p-5 pt-4"
    >
      <Hamburger getOpenState={getOpenStateMobileMenu} />
      <MobileNav menuIsOpen={menuIsOpen} />
      <div className="hidden md:flex flex-col justify-center">
        <p className="font-light">Welcome Back !</p>
        <p className="font-semibold">
          <span>{userProfile?.username}</span>
        </p>
      </div>
      <div className="flex items-center gap-x-4">
        <div
          className="flex justify-center items-center h-8 lg:h-11 
          aspect-square rounded-full  bg-primary-210 text-primary-100"
        >
          <img src={settingsIcon} alt="setting wheel" className="h-5 lg:h-7" />
        </div>
        <div
          className="flex justify-center items-center h-8 lg:h-11 
        aspect-square rounded-full bg-primary-210 text-primary-100"
        >
          <Link to="/notification" className="flex justify-center items-center">
            <img
              src={notificationBellIcon}
              alt="notification bell"
              className="h-5 lg:h-7"
            />
          </Link>
        </div>
        <div className="flex gap-x-2.5 items-center">
          <Avatar avatar={userProfile?.avatar_url} />
          <div className="hidden lg:flex flex-col justify-between">
            <p className="font-medium">
              {`${userProfile?.username ?? ''} ${userProfile?.last_name ?? ''}`}
            </p>
            <p className="font-light text-sm">{userProfile?.email}</p>
          </div>
        </div>
        <NavUser>
          <div className="bg-primary-210 text-primary-100 p-1 rounded-sm mr-4 lg:mr-0">
            <ChevronDown size={20} />
          </div>
        </NavUser>
      </div>
    </div>
  );
}

export default Header;
