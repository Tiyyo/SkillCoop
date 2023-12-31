import { useApp } from '../../store/app.store';
import Container from '../../layout/container';
import DispatchNotifications from './dispatch';
import NotificationFilters from './filters';
import { useNotifications } from '../../store/notification.store';
import { useEffect, useLayoutEffect } from 'react';
import { useGetNotifications } from '../../hooks/useNotification';
import { useTranslation } from 'react-i18next';

function NotificationContainer() {
  const { t } = useTranslation('system');
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

  return (
    <>
      <Container
        className="flex flex-col p-2 lg:mt-4 lg:rounded-none 
          lg:rounded-t-lg rounded-b-none"
      >
        <h2 className="font-semibold text-sm lg:text-lg px-3 py-2">
          {t('notifications')}
        </h2>
        <NotificationFilters />
      </Container>
      <Container className="flex-grow px-1.5 lg:rounded-none lg: rounded-b-lg">
        {notifications && notifications.length === 0 && (
          <p className="text-sm text-light text-center mt-4">
            {t('noNotifications')}
          </p>
        )}
        {notifications &&
          notifications
            .filter((notification) => {
              if (activeFilter === 'all') return true;
              return notification.type_name === activeFilter;
            })
            .map((notification) => <DispatchNotifications {...notification} />)}
      </Container>
    </>
  );
}

export default NotificationContainer;
