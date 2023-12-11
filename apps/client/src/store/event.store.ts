import { create } from 'zustand';
import { EventStatus } from '../types';

type State = {
  start_date: string | null;
  start_time: string | null;
  location: string | null;
  duration: number | null;
  required_participants: number | null;
  organizer_id?: number | null;
  status_name: EventStatus | null;
  participants?: number[] | null;
  user_status?: string | null;
  confirmed_participants?: number | null;
};

type eventStore = {
  event: State;
  initEventState: (args: State) => void;
  updateStartDate: (args: string) => void;
  updateStartTime: (args: string) => void;
  updateLocation: (args: string) => void;
  updateDuration: (args: number) => void;
  updateRequiredParticipants: (args: number) => void;
  updateOrganizerId: (args: number) => void;
  updateStatusName: (args: EventStatus) => void;
  updateIdsParticipants: (args: number[]) => void;
  addInvitedParticipantsIds: (args: number) => void;
  removeInvitedParticipantsIds: (args: number) => void;
  updateUserStatus: (args: string) => void;
}

export const useEventStore = create<eventStore>()((set) => ({
  event: {
    start_date: null,
    start_time: null,
    location: null,
    duration: null,
    required_participants: null,
    organizer_id: null,
    status_name: null,
    participants: null,
    user_status: null,
    confirmed_participants: null,
  },
  initEventState: (event: State) =>
    set((state) => ({
      ...state,
      event: event,
    })),
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
  updateStatusName: (statusName: EventStatus) =>
    set((state) => ({
      ...state,
      event: { ...state.event, status_name: statusName },
    })),
  updateUserStatus: (statusName: string) =>
    set((state) => ({
      ...state,
      event: { ...state.event, user_status: statusName },
    })),
  updateIdsParticipants: (idsParticipants: number[]) =>
    set((state) => ({
      ...state,
      event: { ...state.event, participants: idsParticipants },
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
}));

export const useEvent = () => {
  const initEventState = useEventStore((state) => state.initEventState);
  const updateStartDate = useEventStore((state) => state.updateStartDate);
  const updateStartTime = useEventStore((state) => state.updateStartTime);
  const updateDuration = useEventStore((state) => state.updateDuration);
  const updateLocation = useEventStore((state) => state.updateLocation);
  const updateOrganizerId = useEventStore((state) => state.updateOrganizerId);
  const updateStatusName = useEventStore((state) => state.updateStatusName);
  const updateRequiredParticipants = useEventStore(
    (state) => state.updateRequiredParticipants,
  );
  const updateIdsParticipants = useEventStore(
    (state) => state.updateIdsParticipants,
  );
  const addInvitedParticipantsIds = useEventStore(
    (state) => state.addInvitedParticipantsIds,
  );
  const removeInvitedParticipantsIds = useEventStore(
    (state) => state.removeInvitedParticipantsIds,
  );
  const updateUserStatus = useEventStore((state) => state.updateUserStatus);
  const data = useEventStore((state) => state.event);

  return {
    initEventState,
    updateStartDate,
    updateStartTime,
    updateDuration,
    updateLocation,
    updateRequiredParticipants,
    updateIdsParticipants,
    addInvitedParticipantsIds,
    removeInvitedParticipantsIds,
    updateUserStatus,
    updateOrganizerId,
    updateStatusName,
    data,
  };
};
