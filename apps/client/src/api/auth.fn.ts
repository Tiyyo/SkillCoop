import { api } from './api.fn';
import type { Credentials, RegisterUser } from '@skillcoop/types/src';

export const signUpUserFn = async (
  user: RegisterUser,
): Promise<string | { message: string }> => {
  const response = await api.post('api/auth/register', user);
  return response.data;
};

export const loginUserFn = async (user: Credentials) => {
  const response = await api.post('api/auth/login', user, { timeout: 5000 });
  api.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${response.data.accessToken}`;
  return response.data;
};

export const loginAsDemo = async () => {
  const response = await api.post('api/auth/demo');
  api.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${response.data.accessToken}`;
  return response.data;
};

export const logoutUserFn = async () => {
  const response = await api.post('api/auth/logout');
  api.defaults.headers.common['Authorization'] = '';
  return response.data;
};

export const forgotPasswordFn = async (email: string) => {
  const response = await api.post(`api/user/forgot-password`, { email });
  return response.data;
};

export const resetPasswordFn = async (data: {
  password: string;
  confirmPassword: string;
}) => {
  const response = await api.post(`api/user/reset-password`, data);
  return response.data;
};

export const sendEmailVerifyFn = async (email: string) => {
  const response = await api.post(`api/user/email`, { email });
  return response.data;
};
