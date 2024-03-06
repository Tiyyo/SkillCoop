import { Home, MessagesSquare, Search } from 'lucide-react';
import Calendar from '../../../assets/icon/Calendar';
import NavMobileLink from '../nav-link';
import Profile from '../../../assets/icon/Profile';
import Friends from '../../../assets/icon/Friends';
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
      className={`absolute z-20 rounded-b-xl bg-base-light shadow-sm  ${
        menuIsOpen ? 'h-fit' : 'h-0'
      } w-full transition-all duration-300 `}
    >
      <ul
        className={`px-2 pt-14  transition-opacity duration-500 ${
          menuIsOpen ? 'opacity-100' : '-translate-y-96 opacity-0'
        }`}
      >
        <NavMobileLink to="" value={t('home')} setClose={setClose}>
          <Home size={20} />
        </NavMobileLink>
        <NavMobileLink
          to="/user/profile"
          value={t('profile')}
          setClose={setClose}
        >
          <Profile />
        </NavMobileLink>
        <NavMobileLink to="/contact" value={t('friends')} setClose={setClose}>
          <Friends />
        </NavMobileLink>
        <NavMobileLink to="/my-event" value={t('myEvents')} setClose={setClose}>
          <Calendar />
        </NavMobileLink>
        <NavMobileLink
          to="/find-event"
          value={t('findEvents')}
          setClose={setClose}
        >
          <Search size={20} />
        </NavMobileLink>
        <NavMobileLink to="/chat" value={t('chat')} setClose={setClose}>
          <MessagesSquare size={20} />
        </NavMobileLink>
      </ul>
    </div>
  );
}

export default MobileNav;
