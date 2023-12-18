import { create } from 'zustand';
import type { EventParticipant, EventStatus, InvitationStatus } from 'skillcoop-types';

export type EventStateStore = {
  start_date: string | null;
  start_time: string | null;
  location: string | null;
  duration: number | null;
  required_participants: number | null;
  organizer_id?: number | null;
  status_name: EventStatus | null;
  participants?: EventParticipant[] | null;
  user_status?: string | null;
  confirmed_participants?: number | null;
  staged_participants?: EventParticipant[] | null;
};

type eventStore = {
  event: EventStateStore;
  initEventState: (args: EventStateStore) => void;
  updateStartDate: (args: string) => void;
  updateStartTime: (args: string) => void;
  updateLocation: (args: string) => void;
  updateDuration: (args: number) => void;
  updateRequiredParticipants: (args: number) => void;
  updateOrganizerId: (args: number) => void;
  updateStatusName: (args: EventStatus) => void;
  updateParticipants: (args: EventParticipant[]) => void;
  addToStaged: (args: EventParticipant) => void;
  removeFromStaged: (args: number) => void;
  updateUserStatus: (args: string) => void;
  updateParticipantStatus: (args: InvitationStatus, id: number) => void;
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
    staged_participants: null,
    confirmed_participants: null,
  },
  initEventState: (event: EventStateStore) =>
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
  updateParticipants: (participants: EventParticipant[]) =>
    set((state) => ({
      ...state,
      event: { ...state.event, participants: [...participants, ...(state.event.participants || [])] },
    })),
  addToStaged: (participant: EventParticipant) =>
    set((state) => ({
      ...state,
      event: {
        ...state.event,
        staged_participants: state.event.staged_participants
          ? [...state.event.staged_participants, participant]
          : [participant],
      },
    })),
  removeFromStaged: (participantId: number) =>
    set((state) => ({
      ...state,
      event: {
        ...state.event,
        staged_participants: state.event.staged_participants?.filter(
          (p) => p.profile_id !== participantId,
        ),
      },
    })),
  updateParticipantStatus: (statusName: InvitationStatus, id: number) => set((state) => ({
    ...state,
    event: {
      ...state.event,
      participants: state.event.participants?.map((p) => {
        if (p.profile_id === id) {
          return {
            ...p,
            status: statusName
          }
        }
        return p
      })
    }
  }))
}));

export const useEvent = () => {
  const initEventState = useEventStore((state) => state.initEventState);
  const updateStartDate = useEventStore((state) => state.updateStartDate);
  const updateStartTime = useEventStore((state) => state.updateStartTime);
  const updateDuration = useEventStore((state) => state.updateDuration);
  const updateLocation = useEventStore((state) => state.updateLocation);
  const updateOrganizerId = useEventStore((state) => state.updateOrganizerId);
  const updateStatusName = useEventStore((state) => state.updateStatusName);
  const updateParticipantStatus = useEventStore((state) => state.updateParticipantStatus);
  const updateRequiredParticipants = useEventStore(
    (state) => state.updateRequiredParticipants,
  );
  const updateParticipants = useEventStore(
    (state) => state.updateParticipants,
  );
  const addToStaged = useEventStore(
    (state) => state.addToStaged,
  );
  const removeFromStaged = useEventStore(
    (state) => state.removeFromStaged,
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
    updateParticipants,
    addToStaged,
    removeFromStaged,
    updateUserStatus,
    updateOrganizerId,
    updateStatusName,
    updateParticipantStatus,
    data,
  };
};
