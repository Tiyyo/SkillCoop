import { useQuery } from '@tanstack/react-query';
import { getNotificationFn } from '../../api/api.fn';
import { useApp } from '../../store/app.store';
import Header from '../../component/header';
import Container from '../../layout/container';
import TitleH2 from '../../component/title-h2';
import DispatchNotifications from './dispatch';
import { useState } from 'react';

function NotificationContainer() {
  const [activeFilter, setActiveFilter] = useState<string>('all'); // ['all', 'events', 'friends'
  const { userProfile } = useApp();

  const {
    data: notifications,
    isLoading,
    isFetching,
    isError,
  } = useQuery(['notifications'], () => {
    {
      if (!userProfile?.profile_id) return null;
      return getNotificationFn(userProfile?.profile_id);
    }
  });

  if (!notifications) return null;
  if (notifications && notifications.length === 0)
    return <p> No notification </p>;
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Container>
        <TitleH2 title="Notifications" />
      </Container>
      <div>
        <button type="button" value="all">
          All
        </button>
        <button type="button" value="events">
          Events
        </button>
        <button type="button" value="friends">
          Friends
        </button>
      </div>
      <Container className="flex-grow p-0">
        {notifications &&
          notifications.map((notification) => (
            <DispatchNotifications {...notification} />
          ))}
      </Container>
    </div>
  );
}

export default NotificationContainer;
