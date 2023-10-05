import Page from '../../layout/Page';
import Header from '../../component/header';
import { Outlet } from 'react-router-dom';

function HomePageUser() {
  return (
    <Page>
      <Header
        title="Profile"
        isPlusExist={false}
      />
      <Outlet />
    </Page>
  );
}

export default HomePageUser;
