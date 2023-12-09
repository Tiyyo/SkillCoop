import Hamburger from '../hamburger';
import { useEffect, useState } from 'react';
import MobileNav from '../mobile-nav';
import NavUser from '../nav-user';
import { ChevronDown } from 'lucide-react';
import Avatar from '../avatar';
import notificationBellIcon from '../../assets/svg/notification-bell.svg';
import settingsIcon from '../../assets/svg/settings-wheel.svg';
import { useApp } from '../../store/app.store';
import { sseEvent } from '../../main';
import { Link } from 'react-router-dom';
import { useGetNotifications } from '../../hooks/useNotification';
import { useNotifications } from '../../store/notification.store';

function Header() {
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
  const getOpenStateMobileMenu = (state: boolean) => {
    setMenuIsOpen(state);
  };
  const { userProfile } = useApp();
  const { allUnreadNotifications, setNotification } = useNotifications();
  const {
    refetch,
    data: refetchNotifications,
    isLoading,
    isFetching,
  } = useGetNotifications({
    profileId: userProfile?.profile_id,
  });

  const loading = isLoading || isFetching;

  sseEvent.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.message.includes('new notification')) {
      console.log('If here query has refetched');
      refetch();
    }
  };
  sseEvent.onerror = (event) => {
    console.log('Line 47 SSE error :', event);
    sseEvent.close();
  };

  useEffect(() => {
    if (refetchNotifications) {
      setNotification(refetchNotifications);
    }
  }, [loading]);

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
          <Link
            to="/notification"
            className="relative flex justify-center items-center"
          >
            <img
              src={notificationBellIcon}
              alt="notification bell"
              className="h-5 lg:h-7"
            />
            {allUnreadNotifications && Number(allUnreadNotifications) > 0 ? (
              <div
                className="absolute -top-0.5 -right-0.5 h-2.5 rounded-full
               bg-primary-700 aspect-square animate-pulse"
              ></div>
            ) : (
              ''
            )}
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
