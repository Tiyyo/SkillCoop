import Container from '../../shared/layouts/container';
import DispatchNotifications from './dispatch';
import NotificationFilters from './filters';
import { useTranslation } from 'react-i18next';
import NotFoundMessage from '../../shared/components/not-found-message';
import useNotificationManager from './hooks/useNotificationManager';

function NotificationContainer() {
  const { t } = useTranslation('system');
  const { activeFilter, notifications } = useNotificationManager();

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
      <Container className="flex-grow px-1.5 lg:rounded-none  lg:rounded-b-lg">
        {notifications && notifications.length === 0 && (
          <NotFoundMessage message={t('noNotifications')} />
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
