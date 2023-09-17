import axios from 'axios';
import { RegisterUser, User } from '../types';
const BASE_URL = 'http://localhost:8082';


export const authApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
})

authApi.defaults.headers.common['Content-Type'] = 'application/json';

export const refreshAccessToken = async () => {
  const response = await authApi.get('/auth/refresh')
  return response.data
}

authApi.interceptors.response.use(
  (response) => {
    return response
  }, async (error) => {
    const originalRequest = error.config
    const errMessage = error.response.data.error as string
    if (errMessage.includes('unauthorized') && !originalRequest._retry) {
      originalRequest._retry = true
      const { accessToken } = await refreshAccessToken()
      authApi.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
      return authApi(originalRequest)
    }
    return Promise.reject(error)
  }
)

export const signUpUserFn = async (user: RegisterUser) => {
  const response = await authApi.post('auth/register', user);
  console.log('Response sign up FN :', response);
  return response.data;
};

export const loginUserFn = async (user: User) => {
  const response = await authApi.post('auth/login', user);
  authApi.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`
  return response.data;
};

export const logoutUserFn = async () => {
  const response = await authApi.post('auth/logout');
  return response.data;
};

export const getMeFn = async () => {
  const response = await authApi.get('api/user/me');
  return response.data;
}

export const getAllEventsFn = async () => {
  const response = await authApi.get('api/events');
  return response.data;
};

// export const verifyEmailFn = async (verificationCode: string) => {
//   const response = await authApi.get(
//     `auth/verifyemail/${verificationCode}`
//   );
//   return response.data;
// };

