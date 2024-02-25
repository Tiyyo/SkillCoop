import { api } from './api.fn';
import type { Profile, SearchProfileQuery } from '@skillcoop/types/src';

export const getMeFn = async (): Promise<
  { userProfile?: Profile; userId: string } | 'Unecessary call'
> => {
  const response = await api.get('api/user/me', { timeout: 1500 });
  return response.data;
};

export const getProfileFn = async (profileId: number): Promise<Profile> => {
  const response = await api.get(`api/profile/${profileId}`);
  return response.data;
};

export const getSuggestProfileFn = async (
  profileId: string,
): Promise<Profile[]> => {
  const response = await api.get(`api/friends/suggest/${profileId}`);
  return response.data;
};

export const searchProfileFn = async (
  data: SearchProfileQuery,
  signal?: AbortSignal,
): Promise<Profile[]> => {
  const response = await api.get(`api/profile/search/one`, {
    params: data,
    signal,
  });
  return response.data;
};

export const updateAvatarFn = async (formData: FormData) => {
  const response = await api.patch(`api/profile/avatar`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const updateProfileInfoFn = async (data: Partial<Profile>) => {
  const response = await api.patch(`api/profile`, data);
  return response.data;
};

export const createProfileFn = async (
  data: Partial<Omit<Profile, 'username'>> & { username: string },
) => {
  const response = await api.post('api/profile', data);
  return response.data;
};
