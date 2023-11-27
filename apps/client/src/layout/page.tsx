import SideMenuDesktop from '../test-desktop/side-menu';

function Page({ children }: { children: React.ReactNode }) {
  return (
    <div className="lg:flex lg: w-screen lg:">
      <SideMenuDesktop />
      <div className="flex flex-col min-h-screen bg-base relative pb-8 w-full">
        {children}
      </div>
    </div>
  );
}

export default Page;
