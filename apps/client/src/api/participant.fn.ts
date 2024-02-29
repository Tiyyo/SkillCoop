import { api } from './api.fn';
import type {
  EventInvitation,
  InvitationStatus,
  EventParticipationRequest,
} from '@skillcoop/types/src';

export const updateParticipantFn = async (data: {
  profile_id: string;
  event_id: number;
  status_name: InvitationStatus;
}) => {
  const response = await api.patch(`api/event-participant`, data);
  return response.data;
};

export const sendEventInvitationFn = async (data: EventInvitation) => {
  const response = await api.post(`api/event-participant`, data);
  return response.data;
};

export const sendRequestToJoinEventFn = async (
  data: EventParticipationRequest,
) => {
  const response = await api.post(`api/event-participant/request`, data);
  return response.data;
};
