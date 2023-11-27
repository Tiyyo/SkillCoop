import { Calendar } from 'lucide-react';
import NavButtonDesktop from './nav-button-desktop';

function SideMenuDesktop() {
  return (
    <aside
      className="hidden lg:flex w-[20%] lg:flex-col min-w-[240px]
         bg-dark text-sm text-grey-regular font-medium"
    >
      <div className="flex justify-center h-fit w-full pt-6 pb-12">
        <div className="rounded-full h-10 aspect-square bg-primary-700"></div>
      </div>
      <ul className="w-full">
        <NavButtonDesktop path="/" content="Home">
          <Calendar size={14} />
        </NavButtonDesktop>
        <NavButtonDesktop path="/events/incoming" content="Upcoming Events">
          <Calendar size={14} />
        </NavButtonDesktop>
        <NavButtonDesktop path="/events/past" content="Past Events">
          <Calendar size={14} />
        </NavButtonDesktop>
        <NavButtonDesktop path="/my-event" content="My Events">
          <Calendar size={14} />
        </NavButtonDesktop>
        <NavButtonDesktop path="/contact" content="Friends">
          <Calendar size={14} />
        </NavButtonDesktop>
        {/* <NavButtonDesktop path="/my-event" content="Chat">
          <Calendar size={14} />
        </NavButtonDesktop> */}
        <NavButtonDesktop path="/user/profile" content="Profile">
          <Calendar size={14} />
        </NavButtonDesktop>
      </ul>
    </aside>
  );
}

export default SideMenuDesktop;
