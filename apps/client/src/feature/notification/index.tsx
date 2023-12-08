import { useQuery } from '@tanstack/react-query';
import { getNotificationFn } from '../../api/api.fn';
import { useApp } from '../../store/app.store';
import Header from '../../component/header';
import Container from '../../layout/container';
import DispatchNotifications from './dispatch';
import NotificationFilters from './filters';
import { useNotifications } from '../../store/notification.store';
import { useEffect } from 'react';

function NotificationContainer() {
  const { userProfile } = useApp();
  const { activeFilter, setNotification, notifications } = useNotifications();

  const {
    data: fetchNotifications,
    isLoading,
    isFetching,
    isError,
    isSuccess,
  } = useQuery(['notifications'], () => {
    {
      if (!userProfile?.profile_id) return null;
      return getNotificationFn(userProfile?.profile_id);
    }
  });

  useEffect(() => {
    if (isSuccess && fetchNotifications) {
      setNotification(fetchNotifications);
    }
  }, [isLoading]);

  if (!notifications) return null;
  if (notifications && notifications.length === 0)
    return <p> No notification </p>;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Container className="flex flex-col p-2">
        <h2 className="font-semibold text-sm lg:text-lg px-3 py-2">
          Notifications
        </h2>
        <NotificationFilters />
      </Container>
      <Container className="flex-grow px-1.5">
        {notifications &&
          notifications
            .filter((notification) => {
              if (activeFilter === 'all') return true;
              return notification.type === activeFilter;
            })
            .map((notification) => <DispatchNotifications {...notification} />)}
      </Container>
    </div>
  );
}

export default NotificationContainer;
