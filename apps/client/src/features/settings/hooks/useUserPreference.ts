import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getUserPreferencesFn,
  updateLanguagePreferenceFn,
  updateNotificationPreferenceFn,
  updateThemePreferenceFn,
} from '../../../api/preferences.fn';
import {
  UpdateLanguagePreference,
  UpdateNotificationPreference,
  UpdateThemePreference,
} from '@skillcoop/types/src';

const keys = {
  getUserPreference: ['userPreference'],
};

export function useGetUserPreferences(options: { userId?: string | null }) {
  return useQuery(
    keys.getUserPreference,
    async () => {
      if (!options.userId) return null;
      return getUserPreferencesFn(options.userId);
    },
    { enabled: !options.userId },
  );
}

export function useUpdateNotificationPreference(options: {
  onSuccess?: () => void;
}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (updateObject: UpdateNotificationPreference) => {
      return updateNotificationPreferenceFn(updateObject);
    },
    onSuccess: () => {
      if (options.onSuccess) options.onSuccess();
      queryClient.invalidateQueries(keys.getUserPreference);
    },
  });
}

export function useUpdateLanguagePreference(options: {
  onSuccess?: () => void;
}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (updateObject: UpdateLanguagePreference) => {
      return updateLanguagePreferenceFn(updateObject);
    },
    onSuccess: () => {
      if (options.onSuccess) options.onSuccess();
      queryClient.invalidateQueries(keys.getUserPreference);
    },
  });
}

export function useUpdateThemePreference(options: { onSuccess?: () => void }) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (updateObject: UpdateThemePreference) => {
      return updateThemePreferenceFn(updateObject);
    },
    onSuccess: () => {
      if (options.onSuccess) options.onSuccess();
      queryClient.invalidateQueries(keys.getUserPreference);
    },
  });
}
