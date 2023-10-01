import { Link, NavLink } from 'react-router-dom';
import Avatar from '../avatar';
import Hamburger from '../hamburger';
import TitleH1 from '../title-h1';
import Plus from '../../assets/icon/Plus';
import { useState } from 'react';
import Calendar from '../../assets/icon/Calendar';
import Users from '../../assets/icon/Users';
import Chat from '../../assets/icon/Chat';
import Profile from '../../assets/icon/Profile';
import NavMobileLink from '../nav-link';

interface HeaderProps {
  title: string;
  isPlusExist?: boolean;
  linkFromPlus?: string;
}

function Header({ title, isPlusExist, linkFromPlus }: HeaderProps) {
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
  const getOpenStateMobileMenu = (state: boolean) => {
    setMenuIsOpen(state);
  };

  return (
    <>
      <div
        className={`absolute z-20 bg-base-light shadow-sm rounded-b-xl  ${
          menuIsOpen ? 'h-72' : 'h-0'
        } w-full transition-all duration-300`}>
        <ul
          className={`pt-20 px-2 transition-opacity duration-500 ${
            menuIsOpen ? 'opacity-100' : 'opacity-0 -translate-y-96'
          }`}>
          <NavMobileLink
            to="/"
            value="Events">
            <Calendar size="8" />
          </NavMobileLink>
          <NavMobileLink
            to="/contact"
            value="Friends">
            <Users size="8" />
          </NavMobileLink>
          <NavMobileLink
            to="/chat"
            value="Chat">
            <Chat size="8" />
          </NavMobileLink>
          <NavMobileLink
            to="/profile"
            value="Profile">
            <Users size="8" />
          </NavMobileLink>
        </ul>
      </div>
      <div className="bg-primary-800 h-36 py-4 px-3 flex flex-col justify-between">
        <div className="flex justify-between items-center">
          <Hamburger getOpenState={getOpenStateMobileMenu} />
          <Avatar />
        </div>
        <div className="flex items-end justify-between px-2">
          <TitleH1 title={title} />
          {isPlusExist && linkFromPlus && (
            <Link
              to={linkFromPlus}
              className="text-white border-2 rounded-full p-0.5">
              <Plus />
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

export default Header;
