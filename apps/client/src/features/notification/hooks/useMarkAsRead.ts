import { useNotifications } from '../store/notification.store';
import { useMarkNotificationAsRead } from './useNotification';

export default function useMarkAsRead({ id }: { id: number }) {
  const { markAsReadInStore } = useNotifications();
  const { mutate: markAsRead } = useMarkNotificationAsRead({
    onSuccess: () => {
      markAsReadInStore(id);
    },
  });

  const handleClick = () => {
    markAsRead(id);
  };
  return { handleClick };
}
