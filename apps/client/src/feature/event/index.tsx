import Page from '../../layout/page';
import { Outlet } from 'react-router-dom';
import Header from '../../component/header';
import ReturnBtn from '../../component/return';

function HomePageEvent() {
  return (
    <Page>
      <Header
        title="Events"
        isPlusExist={true}
        linkFromPlus="/new-event"
        textButton="Add New Event"
      />
      <ReturnBtn />
      <Outlet />
    </Page>
  );
}

export default HomePageEvent;
