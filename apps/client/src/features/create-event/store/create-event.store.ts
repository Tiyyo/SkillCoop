import { useMutation } from '@tanstack/react-query';
import { create } from 'zustand';
import { createEventFn } from '../../../api/api.fn';
import type { CreateEventData, Visibility } from '@skillcoop/types/src';
import toast from '../../../shared/utils/toast';
import { queryClient } from '../../../main';
import { useTranslation } from 'react-i18next';

export type CreateEventStateStore = {
  start_date: string | null;
  start_time: string | null;
  location_id: number | null;
  duration: number | null;
  required_participants: number | null;
  organizer_id: number | null;
  visibility: Visibility;
  price: number | null;
  status_name: string | null;
  participants?: number[] | null;
};

type CreateEventStore = {
  event: CreateEventStateStore;
  updateStartDate: (args: string) => void;
  updateStartTime: (args: string) => void;
  updateLocation: (args: number) => void;
  updateDuration: (args: number) => void;
  updateRequiredParticipants: (args: number) => void;
  updateOrganizerId: (args: number) => void;
  updateStatusName: (args: string) => void;
  updateVisibility: (args: Visibility) => void;
  updatePrice: (args: number) => void;
  addInvitedParticipantsIds: (args: number) => void;
  removeInvitedParticipantsIds: (args: number) => void;
  clearEventState: () => void;
};

export const useCreateEventStore = create<CreateEventStore>()((set) => ({
  event: {
    start_date: null,
    start_time: null,
    location_id: null,
    duration: null,
    required_participants: null,
    organizer_id: null,
    status_name: 'open',
    visibility: 'private',
    price: null,
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
  updateLocation: (location: number) =>
    set((state) => ({
      ...state,
      event: { ...state.event, location_id: location },
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
  updateVisibility: (visibility: Visibility) =>
    set((state) => ({
      ...state,
      event: { ...state.event, visibility: visibility },
    })),
  updatePrice: (price: number) =>
    set((state) => ({
      ...state,
      event: { ...state.event, price: price },
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
        location_id: null,
        duration: null,
        required_participants: null,
        organizer_id: null,
        status_name: 'open',
        invited_participants_ids: null,
        price: null,
        visibility: 'private',
      },
    })),
}));

export const useMutateEvent = () => {
  const {
    updateStartDate,
    updateStartTime,
    updateDuration,
    updateLocation,
    updateRequiredParticipants,
    addInvitedParticipantsIds,
    removeInvitedParticipantsIds,
    updateOrganizerId,
    clearEventState,
    updatePrice,
    updateVisibility,
    event: data,
  } = useCreateEventStore((state) => state);
  const { t } = useTranslation('toast');
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
      toast.eventSuccess(t('eventSet'), t('atOn', { startTime, startDate }));
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
    updatePrice,
    updateVisibility,
    isLoading,
    data,
  };
};
