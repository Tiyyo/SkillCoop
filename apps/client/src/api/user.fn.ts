import { api } from './api.fn';
import type { UpdateEmail } from '@skillcoop/types/src';

export const updatePasswordFn = async (data: {
  old_password: string;
  new_password: string;
  user_id: string;
}) => {
  const response = await api.patch(`api/user/password`, data);
  return response.data;
};

export const verifyResetPasswordTokenFn = async (): Promise<{
  message: 'success' | 'expire';
}> => {
  const response = await api.get(`api/user/reset-password`);
  return response.data;
};

export const deleteUserFn = async (userid: string) => {
  const response = await api.delete(`api/user/${userid}`);
  return response.data;
};

export const updateEmailFn = async (data: UpdateEmail) => {
  const response = await api.patch(`api/user/email`, data);
  return response.data;
};
