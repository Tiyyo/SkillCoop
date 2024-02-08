import Hamburger from '../hamburger';
import { useState } from 'react';
import MobileNav from '../mobile-nav';
import NavUser from '../nav-user';
import { ChevronDown } from 'lucide-react';
import Avatar from '../avatar';
import { useApp } from '../../stores/app.store';
import NotificationTrigger from './notification-trigger';
import WelcomeMessage from './welcome-message';
import { startTransition } from 'react';

function Header() {
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
  const getOpenStateMobileMenu = (state: boolean) => {
    startTransition(() => {
      setMenuIsOpen(state);
    });
  };
  const { userProfile } = useApp();

  return (
    <div
      className="flex h-20 w-full justify-between bg-base-light py-3 
      pt-4 shadow-md lg:mt-2 lg:rounded-lg lg:p-5"
    >
      <Hamburger
        getOpenState={getOpenStateMobileMenu}
        closeState={menuIsOpen}
      />
      <MobileNav menuIsOpen={menuIsOpen} setClose={setMenuIsOpen} />
      <WelcomeMessage
        username={userProfile?.username}
        className="hidden flex-grow flex-col justify-center pl-10 md:flex"
      />
      <div className="flex items-center gap-x-4">
        <NotificationTrigger profileId={userProfile?.profile_id} />
        <div className="flex items-center gap-x-2.5">
          <div
            className="aspect-square w-fit rounded-full border-2 
          border-primary-900 p-0.5"
          >
            <Avatar avatar={userProfile?.avatar_url} size={32} />
          </div>
          <div className="hidden flex-col justify-between lg:flex">
            <p className="font-medium">
              {`${userProfile?.first_name ?? ''} ${
                userProfile?.last_name ?? ''
              }`}
            </p>
            <p className="text-sm font-light">{userProfile?.email}</p>
          </div>
        </div>
        <NavUser>
          <div
            className="mr-4 rounded-sm bg-primary-210 
            p-1 text-primary-100 lg:mr-0"
          >
            <ChevronDown size={20} />
          </div>
        </NavUser>
      </div>
    </div>
  );
}

export default Header;
