import { CalendarClock, History, Home, MessagesSquare } from 'lucide-react';
import NavButtonDesktop from '../nav-btn-desktop';
import Profile from '../../../assets/icon/Profile';
import Friends from '../../../assets/icon/Friends';
import Calendar from '../../../assets/icon/Calendar';
import { useTranslation } from 'react-i18next';

function SideMenuDesktop() {
  const { t } = useTranslation('system');
  return (
    <aside
      className="hidden h-full w-[20%] min-w-[240px] 
         bg-dark text-sm
         font-medium text-grey-regular lg:flex lg:flex-col"
    >
      <div className="flex h-fit w-full justify-center pb-12 pt-6">
        <div className="aspect-square h-10 rounded-full ">
          <img
            src="/images/small-logo.png"
            alt="logo"
            className="h-full w-full rounded-full"
          />
        </div>
      </div>
      <ul className="w-full">
        <NavButtonDesktop path="/" content={t('home')}>
          <Home size={20} />
        </NavButtonDesktop>
        <NavButtonDesktop path="/user/profile" content={t('profile')}>
          <Profile />
        </NavButtonDesktop>
        <NavButtonDesktop path="/contact" content={t('friends')}>
          <Friends />
        </NavButtonDesktop>
        <NavButtonDesktop path="/my-event" content={t('myEvents')}>
          <Calendar />
        </NavButtonDesktop>
        <NavButtonDesktop path="/events/incoming" content={t('upcomingEvents')}>
          <CalendarClock size={20} />
        </NavButtonDesktop>
        <NavButtonDesktop path="/events/past" content={t('pastEvents')}>
          <History size={20} />
        </NavButtonDesktop>
        <NavButtonDesktop path="/desktop/chat" content="Chat">
          <MessagesSquare size={20} />
        </NavButtonDesktop>
      </ul>
    </aside>
  );
}

export default SideMenuDesktop;
