import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  deleteEventFn,
  generateTeamsFn,
  getEventFn,
  updateParticipantFn,
} from '../api/api.fn';
import { DeleteEventData, UpdateParticipant } from '../types';

const keys = {
  getEvent: ['events'],
  getEventId: (eventId: number | string) => [
    ...keys.getEvent,
    `${keys.getEvent}/${eventId}}`,
  ],
};

export function useGetSingleEvent(options: {
  eventId: number;
  profileId?: number;
}) {
  return useQuery(
    [`event${options.eventId}`],
    async () => {
      if (!options.profileId || !options.eventId) return;
      return getEventFn(Number(options.eventId), options.profileId);
    },
    { enabled: true, refetchOnMount: false },
  );
}

export function useUpdateParticipant(options: { eventId?: number }) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: UpdateParticipant) => {
      return updateParticipantFn(data);
    },
    onSuccess: () => {
      if (!options.eventId) return;
      queryClient.invalidateQueries(keys.getEventId(options.eventId));
    },
  });
}

export function useGenerateTeams(options: {
  eventId?: number;
  onSuccess?: () => void;
}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (eventId: number) => {
      return generateTeamsFn(eventId);
    },
    onSuccess: () => {
      if (!options.eventId) return;
      queryClient.invalidateQueries(keys.getEventId(options.eventId));
    },
  });
}

export function useDeleteSingleEvent(options: { eventId?: number }) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: DeleteEventData) => {
      return deleteEventFn(data);
    },
    onSuccess: () => {
      if (!options.eventId) return;
      queryClient.invalidateQueries(keys.getEventId(options.eventId));
    },
  });
}
