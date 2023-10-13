import axios from 'axios';
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

export const getSuggestProfileFn = async (profileId: number): Promise<any> => {
  const response = await authApi.get(`api/friends/suggest/${profileId}`)
  return response.data
}

export const getProfileFn = async (profileId: number): Promise<Profile> => {
  const response = await authApi.get(`api/profile/${profileId}`);
  return response.data;
}


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

export const sendEventInvitationFn = async (data: { event_id: number, ids: number[] }) => {
  const response = await authApi.post(`api/profile_on_event`, data);
  return response.data;
}

export const saveScoreFn = async (data: {
  score_team_1: number,
  score_team_2: number,
  event_id: number,
}) => {
  const response = await authApi.post(`api/score`, data);
  return response.data;
}

export const voteMvpFn = async (data: Vote) => {
  const response = await authApi.post(`api/mvp`, data);
  return response.data;
}

export const voteBestStrikerFn = async (data: Vote) => {
  const response = await authApi.post(`api/best_striker`, data);
  return response.data;
}

export const deleteEventFn = async (data: { eventId: number, profileId: number }) => {
  const response = await authApi.delete(`api/event/${data.eventId}/${data.profileId}`, { data });
  return response.data;
}

export const evaluateOwnSkillsFn = async (data: EvaluationOwnSkill) => {
  const response = await authApi.post(`api/skill_foot`, data);
  return response.data;
}

export const evaluateParticipantSkillsFn = async (data: EvaluationParticipantSkill) => {
  const response = await authApi.post(`api/skill_foot/event`, data);
  return response.data;
}

export const getAverageSkillFn = async (data: {
  rater_id: number,
  reviewee_id: number,
  event_id: number
}) => {
  const response = await authApi.get(`api/skill_foot/event`, { params: data });
  return response.data;
}

export const updateProfileInfoFn = async (data) => {
  const response = await authApi.patch(`api/profile`, data);
  return response.data;
}

export const updateEmailFn = async (data) => {
  const response = await authApi.patch(`api/user/email`, data);
  return response.data;
}

export const updatePasswordFn = async (data) => {
  const response = await authApi.patch(`api/user/password`, data);
  return response.data;
}

export const deleteUserFn = async (userid: number) => {
  const response = await authApi.delete(`api/user/${userid}`);
  return response.data;
}

export const updateAvatarFn = async (formData: FormData) => {
  const response = await authApi.patch(`api/profile/avatar`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return response.data
}

export const getProfileEvalFn = async (profileId: number): Promise<ProfileEval> => {
  const response = await authApi.get(`api/skill_foot/${profileId}`)
  return response.data
}
