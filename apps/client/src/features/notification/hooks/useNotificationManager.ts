import { useEffect, useLayoutEffect } from 'react';
import { useGetNotifications } from './useNotification';
import { useNotifications } from '../store/notification.store';
import { useApp } from '../../../shared/store/app.store';

export default function useNotificationManager() {
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
  console.log('notifications', fetchNotifications);
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
  return { notifications, activeFilter };
}
