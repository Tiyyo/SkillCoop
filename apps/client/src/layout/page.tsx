import SideMenuDesktop from '../test-desktop/side-menu';

function Page({ children }: { children: React.ReactNode }) {
  return (
    <div className="lg:flex lg: w-screen">
      <SideMenuDesktop />
      <div className="flex flex-col min-h-screen bg-grey-off relative pb-8 w-full lg:px-6">
        {children}
      </div>
    </div>
  );
}

export default Page;
