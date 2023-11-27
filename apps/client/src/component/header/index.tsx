import { Link } from 'react-router-dom';
import Hamburger from '../hamburger';
import TitleH1 from '../title-h1';
import { useState } from 'react';
import MobileNav from '../mobile-nav';
import NavUser from '../nav-user';
import { ChevronDown, PlusIcon } from 'lucide-react';
import Avatar from '../avatar';
import Container from '../../layout/container';
import notificationBellIcon from '../../assets/svg/notification-bell.svg';
import settingsIcon from '../../assets/svg/settings-wheel.svg';
import { useApp } from '../../store/app.store';

interface HeaderProps {
  title: string;
  isPlusExist?: boolean;
  linkFromPlus?: string;
  textButton?: string;
  legend?: string;
}

function Header({
  title,
  isPlusExist,
  linkFromPlus,
  textButton,
  legend,
}: HeaderProps) {
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
  const getOpenStateMobileMenu = (state: boolean) => {
    setMenuIsOpen(state);
  };
  const { userProfile } = useApp();

  return (
    <>
      <div
        className="flex justify-between bg-base-light w-full h-20 lg:rounded-lg lg:mt-2 shadow-md 
              lg:p-5"
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
            <img
              src={settingsIcon}
              alt="setting wheel"
              className="h-5 lg:h-7"
            />
          </div>
          <div
            className="flex justify-center items-center h-8 lg:h-11 
        aspect-square rounded-full bg-primary-210 text-primary-100"
          >
            <img
              src={notificationBellIcon}
              alt="notification bell"
              className="h-5 lg:h-7"
            />
          </div>
          <div className="flex gap-x-2.5 items-center">
            <Avatar avatar={userProfile?.avatar_url} />
            <div className="hidden lg:flex flex-col justify-between">
              <p className="font-medium">
                {userProfile?.first_name + ' ' + userProfile?.last_name}
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
      <Container className="lg:my-2 flex justify-between">
        <TitleH1 title={title} legend={legend} />
        {isPlusExist && linkFromPlus && textButton && (
          <Link
            to={linkFromPlus}
            className="flex self-center items-center justify-center h-7 w-7 
              lg:w-fit lg:h-11 lg:px-5 
              lg:py-4 rounded-full sm:rounded-3xl
             bg-primary-100 text-white hover:bg-primary-600 hover:text-dark 
              duration-300 font-medium text-xs lg:text-sm "
          >
            <PlusIcon size={24} />
            <p className="hidden lg:block text-center">{textButton}</p>
          </Link>
        )}
      </Container>
    </>
  );
}

export default Header;
