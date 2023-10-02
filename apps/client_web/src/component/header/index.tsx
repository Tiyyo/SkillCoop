import { Link } from 'react-router-dom';
import Hamburger from '../hamburger';
import TitleH1 from '../title-h1';
import Plus from '../../assets/icon/Plus';
import { useState } from 'react';
import { useApp } from '../../store/app.store';
import MobileNav from '../mobile-nav';
import NavUser from '../nav-user';

interface HeaderProps {
  title: string;
  isPlusExist?: boolean;
  linkFromPlus?: string;
}

function Header({ title, isPlusExist, linkFromPlus }: HeaderProps) {
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
  const { userProfile } = useApp();
  const getOpenStateMobileMenu = (state: boolean) => {
    setMenuIsOpen(state);
  };

  return (
    <>
      <MobileNav menuIsOpen={menuIsOpen} />
      <div className="bg-primary-800 h-36 py-4 px-3 flex flex-col justify-between">
        <div className="flex justify-between items-center">
          <Hamburger getOpenState={getOpenStateMobileMenu} />
          <NavUser userAvatar={userProfile?.avatar_url} />
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
