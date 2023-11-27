import { Outlet } from 'react-router-dom';
import Header from '../../component/header';
import Page from '../../layout/page';

function HomePageFriendslist() {
  return (
    <Page>
      <Header
        title="Contact"
        isPlusExist={true}
        linkFromPlus="add"
        textButton="Add New Friend"
      />
      <Outlet />
    </Page>
  );
}

export default HomePageFriendslist;
