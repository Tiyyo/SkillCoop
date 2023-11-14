import { useQuery } from '@tanstack/react-query';
import { getEventsFn } from '../api/api.fn';

export function useGetAllEvents(options: { profileId?: number }) {
  return useQuery(
    [`events`],
    async () => {
      if (!options.profileId) return null;
      return getEventsFn(options.profileId);
    },
    { enabled: true, staleTime: 10 },
  );
}
