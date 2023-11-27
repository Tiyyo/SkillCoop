import { CalendarClock, History, Home } from 'lucide-react';
import Calendar from '../../assets/icon/Calendar';
import NavMobileLink from '../nav-link';
import Profile from '../../assets/icon/Profile';
import Friends from '../../assets/icon/Friends';

function MobileNav({ menuIsOpen }: { menuIsOpen: boolean }) {
  return (
    <div
      className={`absolute z-20 bg-base-light shadow-sm rounded-b-xl  ${
        menuIsOpen ? 'h-fit' : 'h-0'
      } w-full transition-all duration-300`}
    >
      <ul
        className={`pt-14 px-2 transition-opacity duration-500 ${
          menuIsOpen ? 'opacity-100' : 'opacity-0 -translate-y-96'
        }`}
      >
        <NavMobileLink to="/" value="Home">
          <Home size={20} />
        </NavMobileLink>
        <NavMobileLink to="/user/profile" value="Profile">
          <Profile />
        </NavMobileLink>
        <NavMobileLink to="/contact" value="Contact">
          <Friends />
        </NavMobileLink>
        <NavMobileLink to="/my-event" value="My Events">
          <Calendar />
        </NavMobileLink>
        <NavMobileLink to="/events/incoming" value="Incoming Events">
          <CalendarClock size={20} />
        </NavMobileLink>
        <NavMobileLink to="/events/past" value="Past Events">
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
