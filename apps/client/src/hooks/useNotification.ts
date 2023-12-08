import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getNotificationFn, markNotficationAsReadFn } from '../api/api.fn';

const keys = {
  getNotifications: ['notification'],
};

export function useGetNotifications(options: { profileId?: number | null }) {
  return useQuery(
    keys.getNotifications,
    async () => {
      if (!options.profileId) return null;
      console.log('Query is called for refetch');
      return getNotificationFn(options.profileId);
    },
    { enabled: false, refetchOnMount: true, staleTime: 0 },
  );
}

export function useMarkNotificationAsRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (notificationId: number) => {
      return markNotficationAsReadFn(notificationId);
    },
    onSuccess: () => {
      // should update the state of the notification here
      // should decrease the number of unread notification in a state somewhere
      queryClient.invalidateQueries(keys.getNotifications);
    },
  });
}
