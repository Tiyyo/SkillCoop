import {
  UserCreatedEventPayload,
  EventCreatedEventPayload,
  EventDeletedEventPayload,
  EventRequestEventPayload,
  EventUpdatedEventPayload,
  FriendRequestAcceptedEventPayload,
  FriendRequestSentEventPayload,
  InvitationEventSentEventPayload,
  RefusedParticipantEventPayload,
  TeamGeneratedEventPayload,
  UserDeletedEventPayload,
} from 'src/domain/shared/event-payload.types';

export interface EmitEventInterface {
  userCreated(data: UserCreatedEventPayload): void;
  userDeleted(profileId: UserDeletedEventPayload): void;
  eventCreated(data: EventCreatedEventPayload): void;
  eventUpdated(eventId: EventUpdatedEventPayload): void;
  eventDeleted(data: EventDeletedEventPayload): void;
  teamGenerated(eventId: TeamGeneratedEventPayload): void;
  invitationEventSent(data: InvitationEventSentEventPayload): void;
  requsetEventSent(data: EventRequestEventPayload): void;
  refusedParticipant(data: RefusedParticipantEventPayload): void;
  friendRequestSent(data: FriendRequestSentEventPayload): void;
  friendRequestAccepted(data: FriendRequestAcceptedEventPayload): void;
}
