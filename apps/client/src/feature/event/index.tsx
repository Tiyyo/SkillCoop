import Page from '../../layout/page';
import { Outlet } from 'react-router-dom';
import Header from '../../component/header';

function HomePageEvent() {
  return (
    <Page>
      <Header />
      <Outlet />
    </Page>
  );
}

export default HomePageEvent;
