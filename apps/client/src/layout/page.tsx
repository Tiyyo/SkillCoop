import ReturnBtn from '../component/return';
import SideMenuDesktop from '../component/side-menu';

function Page({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative flex flex-col lg:flex-row overflow-hidden 
      min-h-screen-mobile lg:min-h-screen"
    >
      <div className="hidden lg:flex h-screen relative">
        <SideMenuDesktop />
        <ReturnBtn />
      </div>
      <main
        className="relative  lg:h-screen flex-grow flex flex-col w-full  
        overflow-x-hidden overflow-y-scroll bg-grey-off 
        lg:px-6 2xl:px-40 lg:pb-10"
      >
        {children}
      </main>
    </div>
  );
}

export default Page;
