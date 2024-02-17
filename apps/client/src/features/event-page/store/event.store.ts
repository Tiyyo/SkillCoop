import { create } from 'zustand';
import type {
  EventParticipant,
  EventStatus,
  InvitationStatus,
  Visibility,
} from '@skillcoop/types/src';
import { getUTCString } from '@skillcoop/date-handler/src';

export type EventStateStore = {
  start_date: string | null;
  start_time: string | null;
  date: string | null; // date should remain in UTC in the store
  location: string | null;
  location_id: number | null;
  duration: number | null;
  visibility: Visibility | null;
  price: number | null;
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
  updateDate: (args: string) => void;
  updateStartDate: (args: string) => void;
  updateStartTime: (args: string) => void;
  updateLocation: (args: string) => void;
  updateLocationId: (args: number) => void;
  updateDuration: (args: number) => void;
  updateRequiredParticipants: (args: number) => void;
  updateOrganizerId: (args: number) => void;
  updateStatusName: (args: EventStatus) => void;
  updateParticipants: (args: EventParticipant[]) => void;
  updatePrice: (args: number) => void;
  updateVisibility: (args: Visibility) => void;
  addToStaged: (args: EventParticipant) => void;
  removeFromStaged: (args: number) => void;
  updateUserStatus: (args: string) => void;
  updateParticipantStatus: (args: InvitationStatus, id: number) => void;
};

export const useEventStore = create<eventStore>()((set) => ({
  event: {
    start_date: null,
    start_time: null,
    date: null,
    location: null,
    location_id: null,
    duration: null,
    visibility: null,
    price: null,
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
  updateDate: (date: string) =>
    set((state) => ({
      ...state,
      event: { ...state.event, date: date },
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
  updateLocationId: (locationId: number) =>
    set((state) => ({
      ...state,
      event: { ...state.event, location_id: locationId },
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
      event: {
        ...state.event,
        participants: [...participants, ...(state.event.participants || [])],
      },
    })),
  updatePrice: (price: number) =>
    set((state) => ({
      ...state,
      event: { ...state.event, price: price },
    })),
  updateVisibility: (visibility: Visibility) =>
    set((state) => ({
      ...state,
      event: { ...state.event, visibility: visibility },
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
  updateParticipantStatus: (statusName: InvitationStatus, id: number) =>
    set((state) => ({
      ...state,
      event: {
        ...state.event,
        participants: state.event.participants?.map((p) => {
          if (p.profile_id === id) {
            return {
              ...p,
              status: statusName,
            };
          }
          return p;
        }),
      },
    })),
}));

export const useEvent = () => {
  const {
    initEventState,
    updateDate,
    updateStartDate: updateStartDateWithoutConversation,
    updateStartTime: updateStartTimeWithoutConversation,
    updateDuration,
    updateLocation,
    updateLocationId,
    updateOrganizerId,
    updateStatusName,
    updateParticipantStatus,
    updateRequiredParticipants,
    updateParticipants,
    updatePrice,
    updateVisibility,
    addToStaged,
    removeFromStaged,
    updateUserStatus,
    event: data,
  } = useEventStore((state) => state);

  function updateLocationNameAndId(locationId: number, location: string) {
    updateLocation(location);
    updateLocationId(locationId);
  }

  function updateStartTime(startTime: string) {
    // compute the new local date from the start date and the start time
    // convert the local date to UTC
    const newLocalDate = new Date(`${data.start_date} ${startTime}`);
    const convertedUTCDate = getUTCString(newLocalDate);
    updateStartTimeWithoutConversation(startTime);
    updateDate(convertedUTCDate);
  }

  function updateStartDate(startDate: string) {
    // compute the new local date from the start date and the start time
    // convert the local date to UTC
    const newLocalDate = new Date(`${startDate} ${data.start_time}`);
    const convertedUTCDate = getUTCString(newLocalDate);
    updateStartDateWithoutConversation(startDate);
    updateDate(convertedUTCDate);
  }

  return {
    initEventState,
    updateStartDate,
    updateStartTime,
    updateDuration,
    updateLocation: updateLocationNameAndId,
    updateRequiredParticipants,
    updateParticipants,
    addToStaged,
    removeFromStaged,
    updateUserStatus,
    updateOrganizerId,
    updateStatusName,
    updateParticipantStatus,
    updatePrice,
    updateVisibility,
    data,
  };
};
