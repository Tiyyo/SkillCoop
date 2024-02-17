import { api } from './api.fn';
import type {
  CreateEventData,
  EventType,
  EventQuery,
  UpdateEventData,
  TransfertOwnership,
  NearestEventQuery,
  NearestEventInfos,
} from '@skillcoop/types/src';

// TODO: find why and when this fn is used
export const getAllEventsFn = async (): Promise<EventType[]> => {
  const response = await api.get('api/events');
  return response.data;
};

export const getEventsFn = async (profileId: number): Promise<EventType[]> => {
  const response = await api.get(`api/event/user/${profileId}`);
  return response.data;
};

export const getEventFn = async (
  eventId: number,
  profileId: number,
): Promise<EventType> => {
  const response = await api.get(`api/event/details/${eventId}/${profileId}`);
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

export const getUpcomingEventFn = async (
  data: EventQuery,
): Promise<{
  events: EventType[];
  previousPage: number;
  eventCount: number;
}> => {
  const response = await api.get(`api/event/upcoming`, { params: data });

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

export const updateEventFn = async (data: Partial<UpdateEventData>) => {
  const response = await api.patch('api/event', data);
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

export const transfertOwnershipEventFn = async (data: TransfertOwnership) => {
  const response = await api.patch(`api/event/organizer`, data);
  return response.data;
};

export const generateTeamsFn = async (eventId: number) => {
  const response = await api.post(`api/event/teams`, { eventId });
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

export const getSharedEventsFn = async (data: {
  profileId: number;
  friendId: number;
}) => {
  const response = await api.get(
    `api/event/shared/${data.profileId}/${data.friendId}`,
  );
  return response.data;
};

export const getNearestEventsFn = async (
  data: NearestEventQuery,
): Promise<Array<NearestEventInfos>> => {
  const response = await api.get('api/event/near', { params: data });
  return response.data;
};
