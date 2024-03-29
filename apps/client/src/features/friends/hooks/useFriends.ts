import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  acceptOrDeclinedFriendRequestFn,
  getFriendsFn,
  getPendingFriendsFn,
  searchFriendsFn,
  sendFriendRequestFn,
} from '../../../api/api.fn';
import type {
  CreateFriendsInvitation,
  UpdateFriendsInvitation,
} from '@skillcoop/types/src';

const keys = {
  getFriends: ['confirmed-friends'],
  getPendingFriends: ['pending-friends'],
  searchFriends: ['search-friends'],
};

export function useGetConfirmedFriends(options: { profileId?: string }) {
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
  profile: string;
  page?: number;
}) {
  return useQuery(
    keys.searchFriends,
    async ({ signal }) => {
      if (options.profile === '' || !options.username) return null;
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

export function useGetPendingFriendsRequest(options: { profileId?: string }) {
  return useQuery(
    keys.getPendingFriends,
    async () => {
      if (!options.profileId) return null;
      return getPendingFriendsFn(options.profileId);
    },
    { enabled: true },
  );
}

export function useInviteFriend(options: {
  onSuccess?: () => void;
  onError?: () => void;
}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateFriendsInvitation) => {
      return sendFriendRequestFn(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(keys.getFriends);
      if (options.onSuccess) options.onSuccess();
    },
    onError: () => {
      if (options.onError) options.onError();
    },
  });
}

export function useFriendInvitationActions(options: {
  onSuccess?: (response: {
    status: string;
    success: true;
    username: string;
  }) => void;
  onError?: () => void;
}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: UpdateFriendsInvitation) => {
      return acceptOrDeclinedFriendRequestFn(data);
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries([
        ...keys.getPendingFriends,
        ...keys.getFriends,
      ]);
      if (options.onSuccess) options.onSuccess(response);
    },
  });
}
