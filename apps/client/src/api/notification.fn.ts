import { api } from './api.fn';
import type { Notification } from '@skillcoop/types/src';

export const markNotficationAsReadFn = async (notificationId: number) => {
  const response = await api.patch(`api/notification`, { notificationId });
  return response.data;
};

export const getNotificationFn = async (
  profileId: number,
): Promise<Notification[]> => {
  const response = await api.get(`api/notification/${profileId}`);
  return response.data;
};
