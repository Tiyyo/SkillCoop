import axios from 'axios';
import { SERVER_URL } from '../shared/utils/server';
export * from './auth.fn';
export * from './evaluation.fn';
export * from './event.fn';
export * from './participant.fn';
export * from './profile.fn';
export * from './user.fn';
export * from './notification.fn';
export * from './friend.fn';

export const api = axios.create({
  baseURL: SERVER_URL,
  withCredentials: true,
});

api.defaults.headers.common['Content-Type'] = 'application/json';

export const refreshAccessToken = async () => {
  const response = await api.get('api/auth/refresh');
  console.log('Refresh Access Token Fn client is called:', response.data);
  return response.data;
};

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const errMessage = error.response?.data?.error as string;
    console.log('Error catch by interceptors:', error.response?.data);
    // errMessage should be unique and bind to validation access token error
    // if errMessage is not unique, it will cause infinite loop
    if (
      errMessage.includes('No access token provided') &&
      !originalRequest._retry
    ) {
      console.log(
        'Retry request becasue token is expired or not present:',
        error.response?.data,
      );
      originalRequest._retry = true;

      const { accessToken } = await refreshAccessToken();

      api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      console.log(
        'Retry interceptors invoke refresh and store it as barer token:',
        accessToken,
        api.defaults.headers,
      );
      return api(originalRequest);
    }
    return Promise.reject(error);
  },
);
