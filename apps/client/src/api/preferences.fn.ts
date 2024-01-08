import { api } from './api.fn';
import type {
  UserPreference,
  UpdateLanguagePreference,
  UpdateNotificationPreference,
  UpdateThemePreference,
} from '@skillcoop/types';

export const getUserPreferencesFn = async (
  userid: number,
): Promise<UserPreference> => {
  const response = await api.get(`api/user-preference/${userid}`);
  return response.data;
};

export const updateNotificationPreferenceFn = async (
  updateObject: UpdateNotificationPreference,
) => {
  const response = await api.patch(
    `api/user-preference/notification`,
    updateObject,
  );
  return response.data;
};

export const updateLanguagePreferenceFn = async (
  updateObject: UpdateLanguagePreference,
) => {
  const response = await api.patch(
    `api/user-preference/language`,
    updateObject,
  );
  return response.data;
};

export const updateThemePreferenceFn = async (
  updateObject: UpdateThemePreference,
) => {
  const response = await api.patch(`api/user-preference/theme`, updateObject);
  return response.data;
};
