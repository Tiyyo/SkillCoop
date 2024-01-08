import { api } from './api.fn';
<<<<<<< HEAD
import type { Profile, SearchProfileQuery } from '@skillcoop/types';

=======
import type { Profile, SearchProfileQuery } from 'skillcoop-types';
>>>>>>> aa5cf6df31348fffebf5a3aa2a2bdf2e309550e8
export const getMeFn = async (): Promise<
  { userProfile: Profile } | 'Unecessary call'
> => {
  const response = await api.get('api/user/me', { timeout: 300 });
  return response.data;
};

export const getProfileFn = async (profileId: number): Promise<Profile> => {
  const response = await api.get(`api/profile/${profileId}`);
  return response.data;
};

export const getSuggestProfileFn = async (
  profileId: number,
): Promise<Profile[]> => {
  const response = await api.get(`api/friends/suggest/${profileId}`);
  return response.data;
};

export const searchProfileFn = async (
  data: SearchProfileQuery,
  signal?: AbortSignal,
): Promise<Profile[]> => {
  const response = await api.get(`api/profile/search`, {
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
  const response = await api.patch(`api/profile`, { data });
  return response.data;
};
