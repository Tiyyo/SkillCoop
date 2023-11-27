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
        legend="Brief summary of the events you have participated in and your
            upcoming scheduled events"
      />
      <ReturnBtn />
      <Outlet />
    </Page>
  );
}

export default HomePageEvent;
