import { Suspense } from 'react';
import ReturnBtn from '../components/return';
import SideMenuDesktop from '../components/side-menu';

function Page({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative flex min-h-screen-mobile flex-col overflow-hidden
      lg:min-h-screen lg:flex-row"
    >
      <div className="relative hidden h-screen lg:flex">
        <Suspense>
          <SideMenuDesktop />
        </Suspense>
        <ReturnBtn />
      </div>
      <main
        className="relative flex w-full flex-grow animate-opacity-in flex-col 
        overflow-x-hidden  
        overflow-y-scroll bg-grey-off opacity-0 
        lg:h-screen lg:px-6 lg:pb-10 2xl:px-40"
      >
        {children}
      </main>
    </div>
  );
}

export default Page;
