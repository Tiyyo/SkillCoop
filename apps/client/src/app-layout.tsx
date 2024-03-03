import { Suspense } from 'react';
import Page from './shared/layouts/page';
import { Outlet } from 'react-router-dom';
import Header from './shared/components/header';
import WrapperMain from './shared/layouts/wrapper-main';

function AppLayout() {
  return (
    <Page>
      <Suspense fallback={<></>}>
        <WrapperMain>
          <Header />
          <Outlet />
        </WrapperMain>
      </Suspense>
    </Page>
  );
}
export default AppLayout;
