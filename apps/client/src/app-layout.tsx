import { Suspense } from 'react';
import Page from './shared/layouts/page';
import { Outlet } from 'react-router-dom';
import Header from './shared/components/header';

function AppLayout() {
  return (
    <Page>
      <Suspense fallback={<></>}>
        <div
          className="relative mx-auto flex w-full max-w-7xl flex-grow 
        animate-opacity-in flex-col bg-grey-off opacity-0 lg:h-screen lg:px-6"
        >
          <Header />
          <Outlet />
        </div>
      </Suspense>
    </Page>
  );
}
export default AppLayout;
