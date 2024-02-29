import { api } from './api.fn';
import type {
  UserPreference,
  UpdateLanguagePreference,
  UpdateNotificationPreference,
  UpdateThemePreference,
} from '@skillcoop/types/src';

export const getUserPreferencesFn = async (
  userid: string,
): Promise<UserPreference> => {
  const response = await api.get(`api/user-preferences/${userid}`);
  return response.data;
};

export const updateNotificationPreferenceFn = async (
  updateObject: UpdateNotificationPreference,
) => {
  const response = await api.patch(
    `api/user-preferences/notification`,
    updateObject,
  );
  return response.data;
};

export const updateLanguagePreferenceFn = async (
  updateObject: UpdateLanguagePreference,
) => {
  const response = await api.patch(
    `api/user-preferences/language`,
    updateObject,
  );
  return response.data;
};

export const updateThemePreferenceFn = async (
  updateObject: UpdateThemePreference,
) => {
  const response = await api.patch(`api/user-preferences/theme`, updateObject);
  return response.data;
};
