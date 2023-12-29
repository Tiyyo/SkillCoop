import { api } from './api.fn';
import type { RegisterUser, User } from 'skillcoop-types';

export const signUpUserFn = async (
  user: RegisterUser,
): Promise<string | { message: string }> => {
  const response = await api.post('auth/register', user);
  return response.data;
};

export const loginUserFn = async (user: User) => {
  const response = await api.post('auth/login', user);
  api.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${response.data.accessToken}`;
  return response.data;
};

export const logoutUserFn = async () => {
  const response = await api.post('auth/logout');
  api.defaults.headers.common['Authorization'] = '';
  return response.data;
};

export const forgotPasswordFn = async (email: string) => {
  const response = await api.post(`auth/forgot-password`, { email });
  return response.data;
};

export const resetPasswordFn = async (data: {
  password: string;
  confirmPassword: string;
}) => {
  const response = await api.post(`auth/reset-password`, data);
  return response.data;
};

export const sendEmailVerifyFn = async (email: string) => {
  const response = await api.post(`auth/email`, { email });
  return response.data;
};
