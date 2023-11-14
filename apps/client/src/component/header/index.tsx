import { Link } from 'react-router-dom';
import Hamburger from '../hamburger';
import TitleH1 from '../title-h1';
import Plus from '../../assets/icon/Plus';
import { useState } from 'react';
import MobileNav from '../mobile-nav';
import NavUser from '../nav-user';

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
      <MobileNav menuIsOpen={menuIsOpen} />
      <div className="h-12 bg-primary-800 flex justify-between items-center p-2">
        <Hamburger getOpenState={getOpenStateMobileMenu} />
        <NavUser />
      </div>
      <div className="px-3 py-3 flex items-center justify-between bg-primary-200">
        <TitleH1 title={title} />
        {isPlusExist && linkFromPlus && (
          <Link
            to={linkFromPlus}
            className="text-primary-800 border-2 border-primary-800 rounded-full p-0.5"
          >
            <Plus />
          </Link>
        )}
      </div>
    </>
  );
}

export default Header;
