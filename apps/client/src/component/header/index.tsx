import Hamburger from '../hamburger';
import { useState } from 'react';
import MobileNav from '../mobile-nav';
import NavUser from '../nav-user';
import { ChevronDown } from 'lucide-react';
import Avatar from '../avatar';
import { useApp } from '../../store/app.store';
import NotificationTrigger from './notification-trigger';
import WelcomeMessage from './welcome-message';

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
      <Hamburger
        getOpenState={getOpenStateMobileMenu}
        closeState={menuIsOpen}
      />
      <MobileNav menuIsOpen={menuIsOpen} setClose={setMenuIsOpen} />
      <WelcomeMessage
        username={userProfile?.username}
        className="hidden md:flex flex-col justify-center"
      />
      <div className="flex items-center gap-x-4">
        <NotificationTrigger profileId={userProfile?.profile_id} />
        <div className="flex gap-x-2.5 items-center">
          <Avatar avatar={userProfile?.avatar_url} />
          <div className="hidden lg:flex flex-col justify-between">
            <p className="font-medium">
              {`${userProfile?.first_name ?? ''} ${
                userProfile?.last_name ?? ''
              }`}
            </p>
            <p className="font-light text-sm">{userProfile?.email}</p>
          </div>
        </div>
        <NavUser>
          <div
            className="bg-primary-210 text-primary-100 p-1 
            rounded-sm mr-4 lg:mr-0"
          >
            <ChevronDown size={20} />
          </div>
        </NavUser>
      </div>
    </div>
  );
}

export default Header;
