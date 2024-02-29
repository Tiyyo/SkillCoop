import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getNotificationFn,
  markNotficationAsReadFn,
} from '../../../api/api.fn';

const keys = {
  getNotifications: ['notification'],
};

export function useGetNotifications(options: { profileId?: string | null }) {
  return useQuery(
    keys.getNotifications,
    async () => {
      if (!options.profileId) return null;
      return getNotificationFn(options.profileId);
    },
    { enabled: false, refetchOnMount: true, staleTime: 0 },
  );
}

export function useMarkNotificationAsRead(options: { onSuccess?: () => void }) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (notificationId: number) => {
      return markNotficationAsReadFn(notificationId);
    },
    onSuccess: () => {
      if (options.onSuccess) options.onSuccess();
      queryClient.invalidateQueries(keys.getNotifications);
    },
  });
}
