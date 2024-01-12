import { CalendarClock, History, Home } from 'lucide-react';
import Calendar from '../../assets/icon/Calendar';
import NavMobileLink from '../nav-link';
import Profile from '../../assets/icon/Profile';
import Friends from '../../assets/icon/Friends';
import { useTranslation } from 'react-i18next';

function MobileNav({
  menuIsOpen,
  setClose,
}: {
  menuIsOpen: boolean;
  setClose: (value: boolean) => void;
}) {
  const { t } = useTranslation('system');
  return (
    <div
      className={`absolute z-20 bg-base-light shadow-sm rounded-b-xl  ${
        menuIsOpen ? 'h-fit' : 'h-0'
      } w-full transition-all duration-300 `}
    >
      <ul
        className={`pt-14 px-2  transition-opacity duration-500 ${
          menuIsOpen ? 'opacity-100' : 'opacity-0 -translate-y-96'
        }`}
      >
        <NavMobileLink to="/home" value={t('home')} setClose={setClose}>
          <Home size={20} />
        </NavMobileLink>
        <NavMobileLink
          to="/home/user/profile"
          value={t('profile')}
          setClose={setClose}
        >
          <Profile />
        </NavMobileLink>
        <NavMobileLink
          to="/home/contact"
          value={t('friends')}
          setClose={setClose}
        >
          <Friends />
        </NavMobileLink>
        <NavMobileLink
          to="/home/my-event"
          value={t('myEvents')}
          setClose={setClose}
        >
          <Calendar />
        </NavMobileLink>
        <NavMobileLink
          to="/home/events/incoming"
          value={t('upcomingEvents')}
          setClose={setClose}
        >
          <CalendarClock size={20} />
        </NavMobileLink>
        <NavMobileLink
          to="/home/events/past"
          value={t('pastEvents')}
          setClose={setClose}
        >
          <History size={20} />
        </NavMobileLink>
        {/* <NavMobileLink to="/chat" value="Chat">
          <Chat size="8" />
        </NavMobileLink> */}
      </ul>
    </div>
  );
}

export default MobileNav;
