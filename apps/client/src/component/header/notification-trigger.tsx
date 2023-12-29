import { useEffect } from 'react';
import notificationBellIcon from '../../assets/svg/notification-bell.svg';
//eslint-disable-next-line
import useSubscriptionNotification from '../../hooks/useSubscriptionNotification';
import { useGetNotifications } from '../../hooks/useNotification';
import { useNotifications } from '../../store/notification.store';
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
        console.log('New notification');
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
      className="flex justify-center items-center h-8 lg:h-11 
        aspect-square rounded-full bg-primary-210 text-primary-100"
    >
      <Link
        to="/notification"
        className="relative flex justify-center items-center"
      >
        <img
          src={notificationBellIcon}
          alt="notification bell"
          className="h-5 lg:h-7"
        />
        {allUnreadNotifications && Number(allUnreadNotifications) > 0 ? (
          <div
            className="absolute -top-0.5 -right-0.5 h-2.5 rounded-full
               bg-primary-700 aspect-square animate-pulse"
          ></div>
        ) : (
          ''
        )}
      </Link>
    </div>
  );
}

export default NotificationTrigger;
