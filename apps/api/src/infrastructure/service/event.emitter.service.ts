import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EmitEventInterface } from 'src/application/services/event.service';
import {
  EventCreatedEventPayload,
  EventDeletedEventPayload,
  EventRequestEventPayload,
  EventUpdatedEventPayload,
  FriendRequestAcceptedEventPayload,
  FriendRequestSentEventPayload,
  InvitationEventSentEventPayload,
  ParticipantConfirmedEventPayload,
  ParticipantDeclinedEventPayload,
  RefusedParticipantEventPayload,
  TeamGeneratedEventPayload,
  UserCreatedEventPayload,
  UserDeletedEventPayload,
  UserUpdatedEventPayload,
} from 'src/domain/shared/event-payload.types';

@Injectable()
export class EventEmitterService implements EmitEventInterface {
  constructor(private readonly eventEmiiter: EventEmitter2) {}
  userCreated(data: UserCreatedEventPayload): void {
    this.eventEmiiter.emit('user.created', data);
  }
  userUpdated(data: UserUpdatedEventPayload): void {
    this.eventEmiiter.emit('user.updated', data);
  }
  userDeleted(data: UserDeletedEventPayload): void {
    this.eventEmiiter.emit('user.deleted', data.profileId);
  }
  eventCreated(data: EventCreatedEventPayload): void {
    this.eventEmiiter.emit('event.created', data);
  }
  eventUpdated(data: EventUpdatedEventPayload): void {
    this.eventEmiiter.emit('event.updated', data.eventId);
  }
  eventDeleted(data: EventDeletedEventPayload): void {
    this.eventEmiiter.emit('event.deleted', data);
  }
  teamGenerated(data: TeamGeneratedEventPayload): void {
    this.eventEmiiter.emit('team.generated', data.eventId);
  }
  invitationEventSent(data: InvitationEventSentEventPayload): void {
    this.eventEmiiter.emit('invitation.event.sent', data);
  }
  requsetEventSent(data: EventRequestEventPayload): void {
    this.eventEmiiter.emit('requset.event.sent', data);
  }
  refusedParticipant(data: RefusedParticipantEventPayload): void {
    this.eventEmiiter.emit('refused.participant', data);
  }
  participantConfirmed(data: ParticipantConfirmedEventPayload): void {
    this.eventEmiiter.emit('participant.confirmed', data);
  }
  participantDeclined(data: ParticipantDeclinedEventPayload): void {
    this.eventEmiiter.emit('participant.declined', data);
  }
  friendRequestSent(data: FriendRequestSentEventPayload): void {
    this.eventEmiiter.emit('friend.request.sent', data);
  }
  friendRequestAccepted(data: FriendRequestAcceptedEventPayload): void {
    this.eventEmiiter.emit('friend.request.accepted', data);
  }
}
