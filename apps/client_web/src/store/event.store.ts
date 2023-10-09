import { create } from "zustand";

type State = {
  start_date: string | null;
  start_time: string | null;
  location: string | null;
  duration: number | null;
  required_participants: number | null;
  organizer_id?: number | null;
  status_name: string | null;
  invited_participants_ids?: number[] | null;
};

interface eventStore {
  event: State;
  initEventState: (args: State) => void
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
    invited_participants_ids: null,
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
        invited_participants_ids: state.event.invited_participants_ids
          ? [...state.event.invited_participants_ids, invitedParticipantsIds]
          : [invitedParticipantsIds],
      },
    })),
  removeInvitedParticipantsIds: (invitedParticipantsIds: number) =>
    set((state) => ({
      ...state,
      event: {
        ...state.event,
        invited_participants_ids: state.event.invited_participants_ids?.filter(
          (id) => id !== invitedParticipantsIds
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
  const updateRequiredParticipants = useEventStore((state) => state.updateRequiredParticipants);
  const addInvitedParticipantsIds = useEventStore((state) => state.addInvitedParticipantsIds);
  const removeInvitedParticipantsIds = useEventStore((state) => state.removeInvitedParticipantsIds);
  const clearEventState = useEventStore((state) => state.clearEventState);
  const data = useEventStore((state) => state.event)

  return {
    initEventState,
    updateStartDate,
    updateStartTime,
    updateDuration,
    updateLocation,
    updateRequiredParticipants,
    addInvitedParticipantsIds,
    removeInvitedParticipantsIds,
    clearEventState,
    data
  }
}