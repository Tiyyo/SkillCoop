import { useEffect } from 'react';
import notificationBellIcon from '../../assets/svg/notification-bell.svg';
/*eslint-disable*/
import useSubscriptionNotification from '../../../features/notification/hooks/useSubscriptionNotification';
import { useGetNotifications } from '../../../features/notification/hooks/useNotification';
import { useNotifications } from '../../../features/notification/store/notification.store';
/*eslint-enable*/
import { Link } from 'react-router-dom';

function NotificationTrigger({ profileId }: { profileId?: number }) {
  const { allUnreadNotifications, setNotification } = useNotifications();
  const {
    refetch,
    data: refetchNotifications,
    isLoading,
    isFetching,
  } = useGetNotifications({
    profileId: profileId,
  });

  useSubscriptionNotification({
    onMessage: (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      if (data.message.includes('new notification')) {
        refetch();
      }
    },
    onError: (error: Event) => {
      console.log('Error from SSE', error);
    },
  });

  const loading = isLoading || isFetching;

  useEffect(() => {
    if (refetchNotifications) {
      setNotification(refetchNotifications);
    }
  }, [loading]);

  useEffect(() => {
    refetch();
  }, []);
  return (
    <div
      className="flex aspect-square h-8 items-center justify-center 
        rounded-full bg-primary-210 text-primary-100 lg:h-11"
    >
      <Link
        to="/notification"
        className="relative flex items-center justify-center"
      >
        <img
          src={notificationBellIcon}
          alt="notification bell"
          className="h-5 lg:h-7"
        />
        {allUnreadNotifications && Number(allUnreadNotifications) > 0 ? (
          <div
            className="absolute -right-0.5 -top-0.5 aspect-square h-2.5
               animate-pulse rounded-full bg-primary-700"
          ></div>
        ) : (
          ''
        )}
      </Link>
    </div>
  );
}

export default NotificationTrigger;
