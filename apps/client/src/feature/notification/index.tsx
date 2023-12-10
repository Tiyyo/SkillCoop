import { useApp } from '../../store/app.store';
import Header from '../../component/header';
import Container from '../../layout/container';
import DispatchNotifications from './dispatch';
import NotificationFilters from './filters';
import { useNotifications } from '../../store/notification.store';
import { useEffect, useLayoutEffect } from 'react';
import { useGetNotifications } from '../../hooks/useNotification';
import Page from '../../layout/page';

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

  console.log('Notifications :', notifications);

  return (
    <Page>
      <Header />
      <Container
        className="flex flex-col p-2 lg:mt-4 lg:rounded-none 
          lg:rounded-t-lg rounded-b-none"
      >
        <h2 className="font-semibold text-sm lg:text-lg px-3 py-2">
          Notifications
        </h2>
        <NotificationFilters />
      </Container>
      <Container className="flex-grow px-1.5 lg:rounded-none lg: rounded-b-lg">
        {notifications && notifications.length === 0 && (
          <p className="text-sm text-light text-center mt-4">
            You don&apos;t have any notifications
          </p>
        )}
        {notifications &&
          notifications
            .filter((notification) => {
              if (activeFilter === 'all') return true;
              return notification.type === activeFilter;
            })
            .map((notification) => <DispatchNotifications {...notification} />)}
      </Container>
    </Page>
  );
}

export default NotificationContainer;
