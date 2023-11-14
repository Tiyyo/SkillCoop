import { useQuery } from '@tanstack/react-query';
import { getFriendsFn, searchFriendsFn } from '../api/api.fn';

const keys = {
  getFriends: ['confirmed-friends'],
  searchFriends: ['search-friends'],
};

export function useGetConfirmedFriends(options: { profileId?: number }) {
  return useQuery(
    keys.getFriends,
    async () => {
      if (!options.profileId) return null;
      return getFriendsFn(options.profileId);
    },
    { enabled: true },
  );
}

export function useSearchInFriendlist(options: {
  username?: string;
  profile: number;
  page?: number;
}) {
  return useQuery(
    keys.searchFriends,
    async ({ signal }) => {
      if (options.profile === 0 || !options.username) return null;
      return searchFriendsFn(
        {
          username: options.username,
          profile: options.profile,
          page: options.page,
        },
        signal,
      );
    },
    { enabled: true },
  );
}
