import { Suspense } from 'react';
import Page from './shared/layouts/page';
import { Outlet } from 'react-router-dom';
import Header from './shared/components/header';

function AppLayout() {
  return (
    <Page>
      <Suspense fallback={<></>}>
        <Header />
        <Outlet />
      </Suspense>
    </Page>
  );
}
export default AppLayout;
