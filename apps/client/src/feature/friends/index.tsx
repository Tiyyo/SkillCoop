import { Outlet } from 'react-router-dom';
import Header from '../../component/header';
import Page from '../../layout/page';

function HomePageFriendslist() {
  return (
    <Page>
      <Header />
      <Outlet />
    </Page>
  );
}

export default HomePageFriendslist;
