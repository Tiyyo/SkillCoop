import { useQuery } from '@tanstack/react-query';
import { getEventsFn, getSharedEventsFn } from '../../../api/api.fn';

export function useGetAllEvents(options: { profileId?: string }) {
  return useQuery(
    [`events`],
    async () => {
      if (!options.profileId) return null;
      return getEventsFn(options.profileId);
    },
    { enabled: true, staleTime: 10, refetchOnMount: true },
  );
}

export function useGetSharedEvents(options: {
  profileId: string | null;
  friendId: string | undefined;
}) {
  return useQuery(
    [`shared-events`, options.profileId, options.friendId],
    async () => {
      if (!options.profileId || !options.friendId) return null;
      return getSharedEventsFn({
        profileId: options.profileId,
        friendId: options.friendId,
      });
    },
    { enabled: true },
  );
}
