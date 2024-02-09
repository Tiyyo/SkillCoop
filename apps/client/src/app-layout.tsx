import { Suspense } from 'react';
import Page from './layouts/page';
import Header from './components/header';
import { Outlet } from 'react-router-dom';

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
