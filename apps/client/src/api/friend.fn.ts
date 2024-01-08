import { api } from './api.fn';
import type {
  Friend,
  SearchFriendQuery,
  UpdateFriendsInvitation,
} from '@skillcoop/types';

export const getFriendsFn = async (profileId: number): Promise<Friend[]> => {
  const response = await api.get(`api/friends/${profileId}`);
  return response.data;
};

export const getPendingFriendsFn = async (
  profileId: number,
): Promise<Friend[]> => {
  const response = await api.get(`api/friends/pending/${profileId}`);
  return response.data;
};

export const searchFriendsFn = async (
  data: SearchFriendQuery,
  signal?: AbortSignal,
): Promise<Friend[]> => {
  const response = await api.get(`api/friends/search/friendlist`, {
    params: data,
    signal,
  });
  return response.data;
};

export const sendFriendRequestFn = async (data: {
  adder_id: number;
  friend_id: number;
}) => {
  const response = await api.post(`api/friends`, data);
  return response.data;
};

export const acceptOrDeclinedFriendRequestFn = async (
  data: UpdateFriendsInvitation,
) => {
  const response = await api.patch(`api/friends`, data);
  return response.data;
};
