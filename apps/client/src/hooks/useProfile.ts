import { useQuery } from '@tanstack/react-query';
import { getProfileEvalFn, getProfileFn } from '../api/api.fn';

const keys = {
  getProfile: ['profile'],
  getProfileId: (profileId: number | string) => [
    ...keys.getProfile,
    `${keys.getProfile}/${profileId}}`,
  ],
  getProfileEvalId: (profileId: number | string) => [
    ...keys.getProfile,
    `${keys.getProfile}/${profileId}}`,
    `${keys.getProfile}/${profileId}/eval`,
  ],
};

export function useGetProfile(options: { profileId?: number }) {
  return useQuery([`profile${options.profileId}`], async () => {
    if (!options.profileId) return;
    return getProfileFn(options.profileId);
  });
}

export function useGetProfileEval(options: { profileId?: number }) {
  return useQuery(
    [
      ...keys.getProfile,
      `${keys.getProfile}/${options.profileId}}`,
      `${keys.getProfile}/${options.profileId}/eval`,
    ],
    async () => {
      if (!options.profileId) return;
      return getProfileEvalFn(options.profileId);
    },
    { enabled: true },
  );
}
