import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createProfileFn,
  deleteUserFn,
  evaluateOwnSkillsFn,
  evaluateParticipantSkillsFn,
  getAverageSkillFn,
  getMeFn,
  getProfileEvalFn,
  getProfileFn,
  getSuggestProfileFn,
  searchProfileFn,
  updateAvatarFn,
  updateEmailFn,
  updateProfileInfoFn,
} from '../../api/api.fn';
import type {
  EvaluationOwnSkill,
  EvaluationParticipantSkill,
  Profile,
  SearchProfileQuery,
  UpdateEmail,
} from '@skillcoop/types/src';
import { AxiosResponse } from 'axios';
import { queryClient } from '../../main';

const keys = {
  getProfile: ['profile'],
  getProfileId: (profileId: number | string) => [
    ...keys.getProfile,
    `${keys.getProfile}/${profileId}}`,
  ],
  getMe: ['auth-user'],
  getProfileEvalId: (profileId: number | string) => [
    `${keys.getProfile}/${profileId}}`,
    `${keys.getProfile}/${profileId}/eval`,
  ],
  getEvaluation: (profileId: number | string) => [
    `${keys.getProfile}/${profileId}/eval`,
  ],
};

export function useGetMe(options: { userProfile: any }) {
  return useQuery(
    keys.getMe,
    async () => {
      // indicate that this query is not necessary
      // to avoid an api call at every render
      if (options.userProfile) {
        return 'Unecessary call';
      }
      return getMeFn();
    },
    {
      enabled: true,
      cacheTime: 0,
      retry: 0,
    },
  );
}

export function useGetProfile({
  profileId,
  enabled = true,
}: {
  profileId?: number;
  enabled?: boolean;
}) {
  return useQuery(
    [`profile${profileId}`],
    async () => {
      if (!profileId) return;
      return getProfileFn(profileId);
    },
    { enabled },
  );
}

export function useGetProfileEval(options: { profileId?: number }) {
  return useQuery(
    [
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

export function useGetSearchProfile(options: SearchProfileQuery) {
  return useQuery([`search-profile`], async ({ signal }) => {
    if (!options.username) return null;
    return searchProfileFn(options, signal);
  });
}

export function useGetSuggestProfile(options: { profileId?: number }) {
  return useQuery([`suggest-profile`], async () => {
    if (!options.profileId) return null;
    return getSuggestProfileFn(options.profileId);
  });
}

export function useDeleteUser(options: { onSuccess?: () => void }) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: number) => {
      return deleteUserFn(userId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(keys.getMe);
      queryClient.clear();
      if (options.onSuccess) options.onSuccess();
    },
  });
}

export function useUpdateAvatar(options: {
  onSuccess?: (response: AxiosResponse) => void;
  onError?: () => void;
  profileId?: number;
}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: FormData) => {
      return updateAvatarFn(data);
    },
    onSuccess: (response) => {
      if (options?.onSuccess) options.onSuccess(response);
      if (options.profileId) {
        queryClient.invalidateQueries(keys.getProfileId(options.profileId));
      }
    },
    onError: () => {
      if (options?.onError) options.onError();
    },
  });
}

export function useUpdateProfile(options: {
  profileId?: number;
  onSuccess?: () => void;
}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Profile>) => {
      return updateProfileInfoFn(data);
    },
    onSuccess: () => {
      if (options.profileId) {
        queryClient.invalidateQueries(keys.getProfileId(options.profileId));
      }
      if (options?.onSuccess) options.onSuccess();
    },
  });
}

export function userCreateProfile(options: { onSuccess?: () => void }) {
  return useMutation({
    mutationFn: (
      data: Partial<Omit<Profile, 'username'>> & {
        username: string;
        profile_id: number;
      },
    ) => {
      return createProfileFn(data);
    },
    onSuccess: () => {
      if (options?.onSuccess) options.onSuccess;
    },
  });
}

export function useUpdateEmail(options: {
  onSuccess?: (response: AxiosResponse) => void;
  onError?: () => void;
}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateEmail) => {
      return updateEmailFn(data);
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries(keys.getMe);
      if (options?.onSuccess) options.onSuccess(response);
    },
    onError: () => {
      if (options?.onError) options.onError();
    },
  });
}

export function useAutoEvaluateSkill(options: {
  onSuccess?: () => void;
  onError?: () => void;
  profileId?: number;
}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: EvaluationOwnSkill) => {
      return evaluateOwnSkillsFn(data);
    },
    onSuccess: () => {
      if (options.profileId) {
        queryClient.invalidateQueries(keys.getProfileEvalId(options.profileId));
      }
      if (options?.onSuccess) options.onSuccess();
    },
    onError: () => {
      if (options?.onError) options.onError();
    },
  });
}

export function useEvaluationSkill(options: {
  onSuccess?: () => void;
  onError?: () => void;
  profileId?: number;
}) {
  return useMutation({
    mutationFn: (data: EvaluationParticipantSkill) => {
      return evaluateParticipantSkillsFn(data);
    },
    onSuccess: () => {
      if (options.profileId) {
        queryClient.invalidateQueries(keys.getEvaluation(options.profileId));
      }
      if (options?.onSuccess) options.onSuccess();
    },
    onError: () => {
      if (options?.onError) options.onError();
    },
  });
}

export function useGetAverageEval({
  eventId,
  userProfileId,
  participantProfileId,
}: {
  eventId: number;
  userProfileId?: number;
  participantProfileId: number;
}) {
  return useQuery(
    [`eval${eventId}/${participantProfileId}`],
    () => {
      if (!userProfileId) return;
      return getAverageSkillFn({
        event_id: eventId,
        rater_id: userProfileId,
        reviewee_id: participantProfileId,
      });
    },
    { enabled: !!userProfileId },
  );
}
