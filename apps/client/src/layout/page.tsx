import ReturnBtn from '../component/return';
import SideMenuDesktop from '../test-desktop/side-menu';

function Page({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative lg:flex overflow-hidden min-h-screen">
      <div className="hidden lg:flex h-screen relative">
        <SideMenuDesktop />
        <ReturnBtn />
      </div>
      <div
        className="relative flex flex-col w-full  
        h-screen overflow-x-hidden overflow-y-scroll bg-grey-off lg:px-6 2xl:px-40"
      >
        {children}
      </div>
    </div>
  );
}

export default Page;
