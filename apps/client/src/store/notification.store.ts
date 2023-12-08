import { create } from 'zustand';
import { Notification, NotificationFilters } from '../types';
import { getNotificationFn } from '../api/api.fn';

interface NotificationStoreProps {
  notifications: Notification[] | null;
  setNotification: (notifications: Notification[]) => void;
  markAsRead: (id: number) => void;
  activeFilter: NotificationFilters;
  setActiveFilter: (activeFilter: NotificationFilters) => void;
}

export const useNotificationStore = create<NotificationStoreProps>()((set) => ({
  notifications: null,
  activeFilter: 'all',
  setNotification: (notifications) =>
    set((state) => ({
      ...state,
      notifications: notifications,
    })),
  setActiveFilter: (activeFilter) =>
    set((state) => ({
      ...state,
      activeFilter: activeFilter,
    })),
  markAsRead: (id) => {
    set((state) => ({
      ...state,
      notifications: state.notifications?.map((notif) => {
        if (notif.id === id) {
          return { ...notif, is_read: 1 };
        }
        return notif;
      }),
    }));
  },
}));

export const useNotifications = () => {
  const notifications = useNotificationStore((state) => state.notifications);
  const setNotification = useNotificationStore(
    (state) => state.setNotification,
  );
  const markAsRead = useNotificationStore((state) => state.markAsRead);
  const activeFilter = useNotificationStore((state) => state.activeFilter);
  const setActiveFilter = useNotificationStore(
    (state) => state.setActiveFilter,
  );

  return {
    notifications,
    markAsReadInStore: markAsRead,
    setNotification,
    activeFilter,
    setActiveFilter,
  };
};
