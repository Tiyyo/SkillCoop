import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  deleteEventFn,
  generateTeamsFn,
  getEventFn,
  saveScoreFn,
  sendEventInvitationFn,
  transfertOwnershipEventFn,
  updateEventFn,
  updateParticipantFn,
  voteBestStrikerFn,
  voteMvpFn,
} from '../api/api.fn';
import type {
  DeleteEventData,
  EventInvitation,
  SaveScore,
  TransfertOwnership,
  UpdateEventData,
  UpdateParticipant,
  Vote,
} from '@skillcoop/types/src';
import { AxiosResponse } from 'axios';

const keys = {
  getEvent: ['events'],
  getEventId: (eventId: number | string) => [
    ...keys.getEvent,
    `${keys.getEvent}/${eventId}}`,
    'past-event',
    'upcoming-event',
    'organize-event',
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
    { enabled: true, refetchOnMount: true, staleTime: 0 },
  );
}

export function useUpdateParticipant(options: {
  eventId?: number | null;
  onSuccess?: (response: unknown) => void;
}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: UpdateParticipant) => {
      return updateParticipantFn(data);
    },
    onSuccess: (response) => {
      if (!options.eventId) return;
      if (options.onSuccess) options.onSuccess(response);
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

export function useDeleteSingleEvent(options: {
  eventId?: number;
  onSuccess?: () => void;
}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: DeleteEventData) => {
      return deleteEventFn(data);
    },
    onSuccess: () => {
      if (!options.eventId) return;
      if (options.onSuccess) options.onSuccess();
      queryClient.invalidateQueries(keys.getEventId(options.eventId));
    },
  });
}

export function useUpdateScoreEvent(options: { eventId?: number }) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: SaveScore) => {
      return saveScoreFn(data);
    },
    onSuccess: () => {
      if (!options.eventId) return;
      queryClient.invalidateQueries(keys.getEventId(options.eventId));
    },
  });
}

export function useUpdateSingleEvent(options: {
  eventId?: number;
  onSuccess?: (arg: AxiosResponse) => void;
}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<UpdateEventData>) => {
      return updateEventFn(data);
    },
    onSuccess: (response) => {
      if (!options.eventId) return;
      queryClient.invalidateQueries(keys.getEventId(options.eventId));
      if (options.onSuccess) options.onSuccess(response);
    },
  });
}

export function useTransfertOwnership(options: {
  eventId: number;
  onSuccess?: () => void;
}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: TransfertOwnership) => {
      return transfertOwnershipEventFn(data);
    },
    onSuccess: () => {
      if (!options.eventId) return;
      queryClient.invalidateQueries(keys.getEventId(options.eventId));
      if (options.onSuccess) options.onSuccess();
    },
  });
}

export function useVoteForMvp(options: {
  eventId?: number;
  onSuccess?: () => void;
  onError?: () => void;
}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Vote) => {
      return voteMvpFn(data);
    },
    onSuccess: () => {
      if (!options.eventId) return;
      queryClient.invalidateQueries(keys.getEventId(options.eventId));
      if (options.onSuccess) options.onSuccess();
    },
    onError: () => {
      if (options.onError) options.onError();
    },
  });
}

export function useVoteForbestStriker(options: {
  eventId?: number;
  onSuccess?: () => void;
  onError?: () => void;
}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Vote) => {
      return voteBestStrikerFn(data);
    },
    onSuccess: () => {
      if (!options.eventId) return;
      queryClient.invalidateQueries(keys.getEventId(options.eventId));
      if (options.onSuccess) options.onSuccess();
    },
    onError: () => {
      if (options.onError) options.onError();
    },
  });
}

export function useSendEventInvitation(options: {
  eventId?: number;
  onSuccess?: () => void;
  onError?: () => void;
}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: EventInvitation) => {
      return sendEventInvitationFn(data);
    },
    onSuccess: () => {
      if (!options.eventId) return;
      queryClient.invalidateQueries(keys.getEventId(options.eventId));
      if (options.onSuccess) options.onSuccess();
    },
    onError: () => {
      if (options.onError) options.onError();
    },
  });
}
