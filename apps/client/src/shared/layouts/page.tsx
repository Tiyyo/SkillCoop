import { Suspense } from 'react';
import ReturnBtn from '../../shared/components/return';
import SideMenuDesktop from '../../shared/components/side-menu';

function Page({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative flex min-h-screen-mobile flex-col
      overflow-hidden text-text-base lg:min-h-screen lg:flex-row"
    >
      <div className="relative hidden h-screen lg:flex">
        <Suspense>
          <SideMenuDesktop />
        </Suspense>
        <ReturnBtn />
      </div>
      <Suspense>
        <main
          className="flex w-full flex-grow animate-opacity-in 
          flex-col justify-center overflow-x-hidden overflow-y-scroll  
        bg-grey-off  outline-2
        outline-orange-700 
         "
        >
          {children}
        </main>
      </Suspense>
    </div>
  );
}

export default Page;
