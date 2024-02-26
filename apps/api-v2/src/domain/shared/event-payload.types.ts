export type UserDeletedEventPayload = {
  profileId: string;
};

export type UserCreatedEventPayload = {
  profileId: string;
};

export type UserUpdatedEventPayload = {
  profileId: string;
  username: string;
  avatar: string | null;
};

export type EventCreatedEventPayload = {
  eventId: number;
  organizerId: string;
  participantsIds?: string[];
};

export type EventUpdatedEventPayload = {
  eventId: number;
};

export type EventDeletedEventPayload = {
  eventId: number;
  organizerId: string;
};

export type TeamGeneratedEventPayload = {
  eventId: number;
};

export type InvitationEventSentEventPayload = {
  eventId: number;
  participantsIds: string[];
  instigatorId: string;
};

export type EventRequestEventPayload = {
  eventId: number;
  instigatorId: string;
};

export type RefusedParticipantEventPayload = {
  eventId: number;
  instigatorId: string;
  subscriberId: string;
};

export type ParticipantConfirmedEventPayload = {
  eventId: number;
  profileId: string;
};

export type ParticipantDeclinedEventPayload = {
  eventId: number;
  profileId: string;
};

export type FriendRequestSentEventPayload = {
  instigatorId: string;
  profileId: string;
};

export type FriendRequestAcceptedEventPayload = {
  instigatorId: string;
  profileId: string;
};
