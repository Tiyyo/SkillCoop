import Page from '../../layouts/page';
import { Outlet } from 'react-router-dom';
import Header from '../../components/header';
import { Suspense } from 'react';

function HomePageEvent() {
  return (
    <Page>
      <Suspense fallback={<></>}>
        <Header />
        <Outlet />
      </Suspense>
    </Page>
  );
}

export default HomePageEvent;
