import Page from '../../layout/page';
import { Outlet } from 'react-router-dom';
import Header from '../../component/header';

function HomePageEvent() {
  return (
    <Page>
      <Header title="Events" isPlusExist={true} linkFromPlus="/new-event" />
      <Outlet />
    </Page>
  );
}

export default HomePageEvent;
