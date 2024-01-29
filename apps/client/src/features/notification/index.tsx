import { useApp } from '../../stores/app.store';
import Container from '../../layouts/container';
import DispatchNotifications from './dispatch';
import NotificationFilters from './filters';
import { useNotifications } from '../../stores/notification.store';
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
        className="flex flex-col rounded-b-none p-2 lg:mt-4 
          lg:rounded-none lg:rounded-t-lg"
      >
        <h2 className="px-3 py-2 text-sm font-semibold lg:text-lg">
          {t('notifications')}
        </h2>
        <NotificationFilters />
      </Container>
      <Container className="lg: flex-grow rounded-b-lg px-1.5 lg:rounded-none">
        {notifications && notifications.length === 0 && (
          <p className="mt-4 text-center text-sm text-light">
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
