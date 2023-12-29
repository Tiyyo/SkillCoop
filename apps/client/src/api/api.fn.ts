import axios from 'axios';
import { SERVER_URL } from '../utils/server';
export * from './auth.fn';
export * from './evaluation.fn';
export * from './event.fn';
export * from './participant.fn';
export * from './profile.fn';
export * from './user.fn';
export * from './notification.fn';
export * from './friend.fn';

const BASE_URL = SERVER_URL;

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

api.defaults.headers.common['Content-Type'] = 'application/json';

export const refreshAccessToken = async () => {
  const response = await api.get('/auth/refresh');
  return response.data;
};

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const errMessage = error.response.data.error as string;
    // errMessage should be unique and bind to validation access token error
    // if errMessage is not unique, it will cause infinite loop
    if (errMessage === 'No access' && !originalRequest._retry) {
      originalRequest._retry = true;
      const { accessToken } = await refreshAccessToken();
      api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      return api(originalRequest);
    }
    return Promise.reject(error);
  },
);
