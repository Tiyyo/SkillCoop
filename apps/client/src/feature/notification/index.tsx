import { useApp } from '../../store/app.store';
import Header from '../../component/header';
import Container from '../../layout/container';
import DispatchNotifications from './dispatch';
import NotificationFilters from './filters';
import { useNotifications } from '../../store/notification.store';
import { useEffect, useLayoutEffect } from 'react';
import { useGetNotifications } from '../../hooks/useNotification';

function NotificationContainer() {
  const { userProfile } = useApp();
  const { activeFilter, notifications, setNotification } = useNotifications();

  const {
    data: fetchNotifications,
    isLoading,
    isFetching,
    refetch,
  } = useGetNotifications({
    profileId: userProfile?.profile_id,
  });

  useLayoutEffect(() => {
    if (userProfile?.profile_id) {
      refetch();
    }
  }, [userProfile]);

  const loading = isLoading || isFetching;

  useEffect(() => {
    if (fetchNotifications) {
      setNotification(fetchNotifications);
    }
  }, [loading]);

  // if (!notifications) return null;
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
