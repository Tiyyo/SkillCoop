import { CalendarClock, History, Home } from 'lucide-react';
import NavButtonDesktop from '../nav-btn-desktop';
import Profile from '../../assets/icon/Profile';
import Friends from '../../assets/icon/Friends';
import Calendar from '../../assets/icon/Calendar';

function SideMenuDesktop() {
  return (
    <aside
      className="h-full first-letter:hidden lg:flex w-[20%] 
         lg:flex-col min-w-[240px]
         bg-dark text-sm text-grey-regular font-medium"
    >
      <div className="flex justify-center h-fit w-full pt-6 pb-12">
        <div className="rounded-full h-10 aspect-square ">
          <img
            src="/images/small-logo.png"
            alt="logo"
            className="h-full w-full rounded-full"
          />
        </div>
      </div>
      <ul className="w-full">
        <NavButtonDesktop path="/" content="Home">
          <Home size={20} />
        </NavButtonDesktop>
        <NavButtonDesktop path="/user/profile" content="Profile">
          <Profile />
        </NavButtonDesktop>
        <NavButtonDesktop path="/contact" content="Friends">
          <Friends />
        </NavButtonDesktop>
        <NavButtonDesktop path="/my-event" content="My Events">
          <Calendar />
        </NavButtonDesktop>
        <NavButtonDesktop path="/events/incoming" content="Upcoming Events">
          <CalendarClock size={20} />
        </NavButtonDesktop>
        <NavButtonDesktop path="/events/past" content="Past Events">
          <History size={20} />
        </NavButtonDesktop>
        {/* <NavButtonDesktop path="/my-event" content="Chat">
          <Calendar size={14} />
        </NavButtonDesktop> */}
      </ul>
    </aside>
  );
}

export default SideMenuDesktop;
