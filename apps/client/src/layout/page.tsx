import ReturnBtn from '../component/return';
import SideMenuDesktop from '../test-desktop/side-menu';

function Page({ children }: { children: React.ReactNode }) {
  return (
    <div className="lg:flex lg: w-screen">
      <SideMenuDesktop />
      <div className="relative flex flex-col min-h-screen bg-grey-off pb-8 w-full lg:px-6">
        <ReturnBtn />
        {children}
      </div>
    </div>
  );
}

export default Page;
