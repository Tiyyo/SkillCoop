import { useMutation } from "@tanstack/react-query";
import { create } from "zustand";
import { createEventFn } from "../api/authApi";
import { CreateEventData } from "../types";
import { useEffect } from "react";
import toast from "../utils/toast";

type State = {
  start_date: string | null;
  start_time: string | null;
  location: string | null;
  duration: number | null;
  required_participants: number | null;
  organizer_id: number | null;
  status_name: string | null;
  invited_participants_ids?: number[] | null;
};

interface CreateEventStore {
  event: State;
  updateStartDate: (args: string) => void;
  updateStartTime: (args: string) => void;
  updateLocation: (args: string) => void;
  updateDuration: (args: number) => void;
  updateRequiredParticipants: (args: number) => void;
  updateOrganizerId: (args: number) => void;
  updateStatusName: (args: string) => void;
  addInvitedParticipantsIds: (args: number) => void;
  removeInvitedParticipantsIds: (args: number) => void;
}

export const useCreateEventStore = create<CreateEventStore>()((set) => ({
  event: {
    start_date: null,
    start_time: null,
    location: null,
    duration: null,
    required_participants: null,
    organizer_id: null,
    status_name: "open",
    invited_participants_ids: null,
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

export const useCreateEvent = () => {
  const { mutate: createEvent, isSuccess, isError } = useMutation((data: CreateEventData) =>
    createEventFn(data)
  );
  const updateStartDate = useCreateEventStore((state) => state.updateStartDate);
  const updateStartTime = useCreateEventStore((state) => state.updateStartTime);
  const updateDuration = useCreateEventStore((state) => state.updateDuration);
  const updateLocation = useCreateEventStore((state) => state.updateLocation);
  const updateRequiredParticipants = useCreateEventStore((state) => state.updateRequiredParticipants);
  const addInvitedParticipantsIds = useCreateEventStore(
    (state) => state.addInvitedParticipantsIds
  );
  const removeInvitedParticipantsIds = useCreateEventStore(
    (state) => state.removeInvitedParticipantsIds
  );
  const updateOrganizerId = useCreateEventStore(
    (state) => state.updateOrganizerId
  );
  const data = useCreateEventStore((state) => state.event);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Event created successfully");
    }
  }, [isSuccess])

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
    data,
  };
};
