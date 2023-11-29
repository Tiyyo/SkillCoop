import Page from '../../layout/page';
import Header from '../../component/header';
import { Outlet } from 'react-router-dom';

function HomePageUser() {
  return (
    <Page>
      <Header />
      <Outlet />
    </Page>
  );
}

export default HomePageUser;
