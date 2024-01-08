import { create } from 'zustand';
import type { Notification, NotificationFilters } from '@skillcoop/types';

type NotificationStoreProps = {
  notifications: Notification[] | null;
  setNotification: (notifications: Notification[]) => void;
  markAsRead: (id: number) => void;
  activeFilter: NotificationFilters;
  setActiveFilter: (activeFilter: NotificationFilters) => void;
};

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

  const allUnreadNotifications = notifications?.filter(
    (notif) => notif.is_read === 0,
  ).length;

  const eventUnreadNotifications = notifications?.filter(
    (notif) => notif.is_read === 0 && notif.type_name === 'event',
  ).length;

  const friendUnreadNotifications = notifications?.filter(
    (notif) => notif.is_read === 0 && notif.type_name === 'friend',
  ).length;

  return {
    notifications,
    markAsReadInStore: markAsRead,
    setNotification,
    activeFilter,
    setActiveFilter,
    allUnreadNotifications,
    eventUnreadNotifications,
    friendUnreadNotifications,
  };
};
