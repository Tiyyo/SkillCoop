import { useMutation } from '@tanstack/react-query';
import { create } from 'zustand';
import { createEventFn } from '../api/api.fn';
import type { CreateEventData } from '@skillcoop/types';
import toast from '../utils/toast';
import { queryClient } from '../main';

export type CreateEventStateStore = {
  start_date: string | null;
  start_time: string | null;
  location: string | null;
  duration: number | null;
  required_participants: number | null;
  organizer_id: number | null;
  status_name: string | null;
  participants?: number[] | null;
};

type CreateEventStore = {
  event: CreateEventStateStore;
  updateStartDate: (args: string) => void;
  updateStartTime: (args: string) => void;
  updateLocation: (args: string) => void;
  updateDuration: (args: number) => void;
  updateRequiredParticipants: (args: number) => void;
  updateOrganizerId: (args: number) => void;
  updateStatusName: (args: string) => void;
  addInvitedParticipantsIds: (args: number) => void;
  removeInvitedParticipantsIds: (args: number) => void;
  clearEventState: () => void;
};

export const useCreateEventStore = create<CreateEventStore>()((set) => ({
  event: {
    start_date: null,
    start_time: null,
    location: null,
    duration: null,
    required_participants: null,
    organizer_id: null,
    status_name: 'open',
    participants: null,
  },
  updateStartDate: (startDate: string) =>
    set((state) => ({
      ...state,
      event: { ...state.event, start_date: startDate },
    })),
  updateStartTime: (startTime: string) =>
    set((state) => ({
      ...state,
      event: { ...state.event, start_time: startTime },
    })),
  updateLocation: (location: string) =>
    set((state) => ({
      ...state,
      event: { ...state.event, location: location },
    })),
  updateDuration: (duration: number) =>
    set((state) => ({
      ...state,
      event: { ...state.event, duration: duration },
    })),
  updateRequiredParticipants: (requiredParticipants: number) =>
    set((state) => ({
      ...state,
      event: { ...state.event, required_participants: requiredParticipants },
    })),
  updateOrganizerId: (organizerId: number) =>
    set((state) => ({
      ...state,
      event: { ...state.event, organizer_id: organizerId },
    })),
  updateStatusName: (statusName: string) =>
    set((state) => ({
      ...state,
      event: { ...state.event, status_name: statusName },
    })),
  addInvitedParticipantsIds: (invitedParticipantsIds: number) =>
    set((state) => ({
      ...state,
      event: {
        ...state.event,
        participants: state.event.participants
          ? [...state.event.participants, invitedParticipantsIds]
          : [invitedParticipantsIds],
      },
    })),
  removeInvitedParticipantsIds: (invitedParticipantsIds: number) =>
    set((state) => ({
      ...state,
      event: {
        ...state.event,
        participants: state.event.participants?.filter(
          (id) => id !== invitedParticipantsIds,
        ),
      },
    })),
  clearEventState: () =>
    set((state) => ({
      ...state,
      event: {
        start_date: null,
        start_time: null,
        location: null,
        duration: null,
        required_participants: null,
        organizer_id: null,
        status_name: 'open',
        invited_participants_ids: null,
      },
    })),
}));

export const useCreateEvent = () => {
  const updateStartDate = useCreateEventStore((state) => state.updateStartDate);
  const updateStartTime = useCreateEventStore((state) => state.updateStartTime);
  const updateDuration = useCreateEventStore((state) => state.updateDuration);
  const updateLocation = useCreateEventStore((state) => state.updateLocation);
  const updateRequiredParticipants = useCreateEventStore(
    (state) => state.updateRequiredParticipants,
  );
  const addInvitedParticipantsIds = useCreateEventStore(
    (state) => state.addInvitedParticipantsIds,
  );
  const removeInvitedParticipantsIds = useCreateEventStore(
    (state) => state.removeInvitedParticipantsIds,
  );
  const updateOrganizerId = useCreateEventStore(
    (state) => state.updateOrganizerId,
  );
  const clearEventState = useCreateEventStore((state) => state.clearEventState);
  const data = useCreateEventStore((state) => state.event);
  const { mutate: createEvent, isLoading } = useMutation({
    mutationFn: async (data: CreateEventData) => createEventFn(data),
    onSuccess: () => {
      // TODO: abstract this to a helper function
      const date = new Date(`${data.start_date} ${data.start_time}`);
      const startTime = new Intl.DateTimeFormat('en-Us', {
        hour: '2-digit',
        minute: '2-digit',
      }).format(date);
      const startDate = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }).format(date);
      toast.eventSuccess('Event set', `At ${startTime} on ${startDate}`);
      queryClient.invalidateQueries([
        'events',
        'past-event',
        'upcoming-event',
        'organize-event',
      ]);
      queryClient.removeQueries([
        'events',
        'past-event',
        'upcoming-event',
        'organize-event',
      ]);
      clearEventState();
    },
  });
  return {
    createEvent,
    updateStartDate,
    updateStartTime,
    updateDuration,
    updateLocation,
    updateRequiredParticipants,
    addInvitedParticipantsIds,
    removeInvitedParticipantsIds,
    updateOrganizerId,
    clearEventState,
    isLoading,
    data,
  };
};
