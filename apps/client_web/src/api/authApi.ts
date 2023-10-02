import axios from 'axios';
import {
  CreateEventData,
  EventType,
  Friend,
  InvitationStatus,
  Profile,
  RegisterUser,
  SearchFriendQuery,
  SearchProfileQuery,
  User,
} from '../types';
const BASE_URL = 'http://localhost:8082';

export const authApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

authApi.defaults.headers.common['Content-Type'] = 'application/json';

export const refreshAccessToken = async () => {
  const response = await authApi.get('/auth/refresh');
  return response.data;
};

authApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const errMessage = error.response.data.error as string;
    if (errMessage.includes('unauthorized') && !originalRequest._retry) {
      originalRequest._retry = true;
      const { accessToken } = await refreshAccessToken();
      authApi.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${accessToken}`;
      return authApi(originalRequest);
    }
    return Promise.reject(error);
  }
);

export const signUpUserFn = async (user: RegisterUser) => {
  const response = await authApi.post('auth/register', user);
  return response.data;
};

export const loginUserFn = async (user: User) => {
  const response = await authApi.post('auth/login', user);
  authApi.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${response.data.accessToken}`;
  return response.data;
};

export const logoutUserFn = async () => {
  console.log('is called');
  const response = await authApi.post('auth/logout');
  return response.data;
};

export const getMeFn = async (): Promise<{ userProfile: Profile }> => {
  const response = await authApi.get('api/user/me');
  return response.data;
};

export const getAllEventsFn = async (): Promise<EventType[]> => {
  const response = await authApi.get('api/events');
  return response.data;
};

export const sendEmailVerifyFn = async (email: string) => {
  const response = await authApi.post(`auth/email`, { email });
  return response.data;
};

export const getEventFn = async (eventId: number, profileId: number): Promise<EventType> => {
  const response = await authApi.get(`api/event/details/${eventId}/${profileId}`);
  return response.data;
}

export const getEventsFn = async (profileId: number): Promise<EventType[]> => {
  const response = await authApi.get(`api/event/user/${profileId}`);
  return response.data;
};

interface EventQuery {
  profileId: number;
  page: number;
}

export const getOrganizeEventFn =
  async (data: EventQuery): Promise<{
    events: EventType[],
    previousPage: number,
    eventCount: number
  }> => {
    const response = await authApi.get(`api/event/organizer`, { params: data });

    return {
      events: response.data.events,
      eventCount: response.data.eventCount,
      previousPage: data.page
    };
  }

export const getPastEventFn =
  async (data: EventQuery): Promise<{
    events: EventType[],
    previousPage: number,
    eventCount: number
  }> => {
    const response = await authApi.get(`api/event/past`, { params: data });

    return {
      events: response.data.events,
      eventCount: response.data.eventCount,
      previousPage: data.page
    };
  }

export const createEventFn = async (data: CreateEventData) => {
  const response = await authApi.post('api/event', data);
  return response.data;
};

export const updateEventFn = async (data: Record<string, string | number>) => {
  const response = await authApi.patch('api/event', data);
  return response.data;
}

export const getFriendsFn = async (profileId: number): Promise<Friend[]> => {
  const response = await authApi.get(`api/friends/${profileId}`);
  return response.data;
};

export const getPendingFriendsFn = async (
  profileId: number
): Promise<Friend[]> => {
  const response = await authApi.get(`api/friends/pending/${profileId}`);
  return response.data;
};

export const searchFriendsFn = async (
  data: SearchFriendQuery,
  signal?: AbortSignal
): Promise<Friend[]> => {
  const response = await authApi.get(`api/friends/search/friendlist`, {
    params: data,
    signal,
  });
  return response.data;
};

export const searchProfileFn = async (
  data: SearchProfileQuery,
  signal?: AbortSignal
): Promise<Profile[]> => {
  const response = await authApi.get(`api/profile/search`, {
    params: data,
    signal,
  });
  return response.data;
};

export const sendFriendRequestFn = async (data: {
  adder_id: number;
  friend_id: number;
}) => {
  const response = await authApi.post(`api/friends`, data);
  return response.data;
};

export const acceptOrDeclinedFriendRequestFn = async (data: {
  adder_id: number;
  friend_id: number;
  status_name: string;
}) => {
  const response = await authApi.patch(`api/friends`, data);
  return response.data;
};

export const updateParticipantFn = async (data: {
  profile_id: number,
  event_id: number,
  status_name: InvitationStatus
}) => {
  const response = await authApi.patch(`api/profile_on_event`, data);
  return response.data;
}
