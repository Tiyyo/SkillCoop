import { api } from './api.fn';
import type {
  EventInvitation,
  InvitationStatus,
  EventParticipationRequest,
} from '@skillcoop/types/src';

export const updateParticipantFn = async (data: {
  profile_id: number;
  event_id: number;
  status_name: InvitationStatus;
}) => {
  const response = await api.patch(`api/profile_on_event`, data);
  return response.data;
};

export const sendEventInvitationFn = async (data: EventInvitation) => {
  const response = await api.post(`api/profile_on_event`, data);
  return response.data;
};

export const sendRequestToJoinEventFn = async (
  data: EventParticipationRequest,
) => {
  const response = await api.post(`api/profile_on_event/request`, data);
  return response.data;
};
