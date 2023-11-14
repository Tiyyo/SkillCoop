import axios from 'axios';
import { SERVER_URL } from '../utils/server';
import {
  CreateEventData,
  EvaluationOwnSkill,
  EvaluationParticipantSkill,
  EventType,
  Friend,
  InvitationStatus,
  Profile,
  ProfileEval,
  RegisterUser,
  SearchFriendQuery,
  SearchProfileQuery,
  User,
  Vote,
} from '../types';

interface EventQuery {
  profileId: number;
  page: number;
}

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

export const signUpUserFn = async (user: RegisterUser) => {
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

export const getMeFn = async (): Promise<
  { userProfile: Profile } | 'Unecessary call'
> => {
  const response = await api.get('api/user/me');
  return response.data;
};

export const getAllEventsFn = async (): Promise<EventType[]> => {
  const response = await api.get('api/events');
  return response.data;
};

export const sendEmailVerifyFn = async (email: string) => {
  const response = await api.post(`auth/email`, { email });
  return response.data;
};

export const getEventFn = async (
  eventId: number,
  profileId: number,
): Promise<EventType> => {
  const response = await api.get(`api/event/details/${eventId}/${profileId}`);
  return response.data;
};

export const getEventsFn = async (profileId: number): Promise<EventType[]> => {
  const response = await api.get(`api/event/user/${profileId}`);
  return response.data;
};

export const getOrganizeEventFn = async (
  data: EventQuery,
): Promise<{
  events: EventType[];
  previousPage: number;
  eventCount: number;
}> => {
  const response = await api.get(`api/event/organizer`, { params: data });

  return {
    events: response.data.events,
    eventCount: response.data.eventCount,
    previousPage: data.page,
  };
};

export const getPastEventFn = async (
  data: EventQuery,
): Promise<{
  events: EventType[];
  previousPage: number;
  eventCount: number;
}> => {
  const response = await api.get(`api/event/past`, { params: data });

  return {
    events: response.data.events,
    eventCount: response.data.eventCount,
    previousPage: data.page,
  };
};

export const createEventFn = async (data: CreateEventData) => {
  const response = await api.post('api/event', data);
  return response.data;
};

export const updateEventFn = async (data: Record<string, string | number>) => {
  const response = await api.patch('api/event', data);
  return response.data;
};

export const getFriendsFn = async (profileId: number): Promise<Friend[]> => {
  const response = await api.get(`api/friends/${profileId}`);
  return response.data;
};

export const getPendingFriendsFn = async (
  profileId: number,
): Promise<Friend[]> => {
  const response = await api.get(`api/friends/pending/${profileId}`);
  return response.data;
};

export const getSuggestProfileFn = async (profileId: number): Promise<any> => {
  const response = await api.get(`api/friends/suggest/${profileId}`);
  return response.data;
};

export const getProfileFn = async (profileId: number): Promise<Profile> => {
  const response = await api.get(`api/profile/${profileId}`);
  return response.data;
};

export const searchFriendsFn = async (
  data: SearchFriendQuery,
  signal?: AbortSignal,
): Promise<Friend[]> => {
  const response = await api.get(`api/friends/search/friendlist`, {
    params: data,
    signal,
  });
  return response.data;
};

export const searchProfileFn = async (
  data: SearchProfileQuery,
  signal?: AbortSignal,
): Promise<Profile[]> => {
  const response = await api.get(`api/profile/search`, {
    params: data,
    signal,
  });
  return response.data;
};

export const sendFriendRequestFn = async (data: {
  adder_id: number;
  friend_id: number;
}) => {
  const response = await api.post(`api/friends`, data);
  return response.data;
};

export const acceptOrDeclinedFriendRequestFn = async (data: {
  adder_id: number;
  friend_id: number;
  status_name: string;
}) => {
  const response = await api.patch(`api/friends`, data);
  return response.data;
};

export const updateParticipantFn = async (data: {
  profile_id: number;
  event_id: number;
  status_name: InvitationStatus;
}) => {
  const response = await api.patch(`api/profile_on_event`, data);
  return response.data;
};

export const sendEventInvitationFn = async (data: {
  event_id: number;
  ids: number[];
}) => {
  const response = await api.post(`api/profile_on_event`, data);
  return response.data;
};

export const saveScoreFn = async (data: {
  score_team_1: number;
  score_team_2: number;
  event_id: number;
}) => {
  const response = await api.post(`api/score`, data);
  return response.data;
};

export const voteMvpFn = async (data: Vote) => {
  const response = await api.post(`api/mvp`, data);
  return response.data;
};

export const voteBestStrikerFn = async (data: Vote) => {
  const response = await api.post(`api/best_striker`, data);
  return response.data;
};

export const deleteEventFn = async (data: {
  event_id: number;
  profile_id: number;
}) => {
  const response = await api.delete(
    `api/event/${data.event_id}/${data.profile_id}`,
    { data },
  );
  return response.data;
};

export const evaluateOwnSkillsFn = async (data: EvaluationOwnSkill) => {
  const response = await api.post(`api/skill_foot`, data);
  return response.data;
};

export const evaluateParticipantSkillsFn = async (
  data: EvaluationParticipantSkill,
) => {
  const response = await api.post(`api/skill_foot/event`, data);
  return response.data;
};

export const getAverageSkillFn = async (data: {
  rater_id: number;
  reviewee_id: number;
  event_id: number;
}) => {
  const response = await api.get(`api/skill_foot/event`, { params: data });
  return response.data;
};

export const updateProfileInfoFn = async (data: Partial<Profile>) => {
  const response = await api.patch(`api/profile`, { data });
  return response.data;
};

export const updateEmailFn = async (data: { email: string }) => {
  const response = await api.patch(`api/user/email`, data);
  return response.data;
};

export const updatePasswordFn = async (data: {
  old_password: string;
  new_password: string;
  user_id: number;
}) => {
  const response = await api.patch(`api/user/password`, data);
  return response.data;
};

export const deleteUserFn = async (userid: number) => {
  const response = await api.delete(`api/user/${userid}`);
  return response.data;
};

export const updateAvatarFn = async (formData: FormData) => {
  const response = await api.patch(`api/profile/avatar`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const getProfileEvalFn = async (
  profileId: number,
): Promise<ProfileEval> => {
  const response = await api.get(`api/skill_foot/${profileId}`);
  return response.data;
};

export const generateTeamsFn = async (eventId: number) => {
  const response = await api.post(`api/event/teams`, { eventId });
  return response.data;
};

export const transfertOwnershipEventFn = async (data: {
  event_id: number;
  organizer_id: number;
  new_organizer_id: number;
}) => {
  const response = await api.patch(`api/event/organizer`, data);
  return response.data;
};
