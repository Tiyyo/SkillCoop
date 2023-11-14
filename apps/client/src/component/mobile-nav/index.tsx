import Calendar from '../../assets/icon/Calendar';
import Chat from '../../assets/icon/Chat';
import Users from '../../assets/icon/Users';
import NavMobileLink from '../nav-link';

function MobileNav({ menuIsOpen }: { menuIsOpen: boolean }) {
  return (
    <div
      className={`absolute z-20 bg-base-light shadow-sm rounded-b-xl  ${
        menuIsOpen ? 'h-64' : 'h-0'
      } w-full transition-all duration-300`}
    >
      <ul
        className={`pt-14 px-2 transition-opacity duration-500 ${
          menuIsOpen ? 'opacity-100' : 'opacity-0 -translate-y-96'
        }`}
      >
        <NavMobileLink to="/" value="Events">
          <Calendar size="8" />
        </NavMobileLink>
        <NavMobileLink to="/contact" value="Friends">
          <Users size="8" />
        </NavMobileLink>
        <NavMobileLink to="/chat" value="Chat">
          <Chat size="8" />
        </NavMobileLink>
        <NavMobileLink to="/user/profile" value="Profile">
          <Users size="8" />
        </NavMobileLink>
      </ul>
    </div>
  );
}

export default MobileNav;
