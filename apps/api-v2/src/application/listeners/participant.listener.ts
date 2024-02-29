import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InvitedEventNotificationService } from 'src/domain/services/notification/subtype/invited-event.notification.service';
import {
  EventRequestEventPayload,
  InvitationEventSentEventPayload,
  ParticipantConfirmedEventPayload,
  ParticipantDeclinedEventPayload,
  RefusedParticipantEventPayload,
} from 'src/domain/shared/event-payload.types';
import { ProducerParticipantMessageService } from 'src/infrastructure/publishers/participant.publisher';

@Injectable()
export class ParticipantListener {
  constructor(
    private readonly invitedEventService: InvitedEventNotificationService,
    private readonly producerParticipantMessageService: ProducerParticipantMessageService,
  ) {}
  @OnEvent('invitation.event.sent')
  handleSendInvitationParticipant(event: InvitationEventSentEventPayload) {
    this.invitedEventService.notify(event.eventId, event.participantsIds);
    this.producerParticipantMessageService.pushToParticipantQueue({
      event_id: event.eventId,
      action: 'add_participant',
      participants_id: event.participantsIds,
    });
  }
  @OnEvent('participant.confirmed')
  handleParticipantConfirmed(payload: ParticipantConfirmedEventPayload) {
    this.producerParticipantMessageService.pushToParticipantQueue({
      event_id: payload.eventId,
      action: 'add_participant',
      participants_id: [payload.profileId],
    });
  }
  @OnEvent('participant.declined')
  handleParticipantDeclined(payload: ParticipantDeclinedEventPayload) {
    this.producerParticipantMessageService.pushToParticipantQueue({
      event_id: payload.eventId,
      action: 'remove_participant',
      participants_id: [payload.profileId],
    });
  }
  @OnEvent('requset.event.sent')
  handleParticipantRequested(event: EventRequestEventPayload) {
    console.log('participant want to join', event);
  }
  @OnEvent('refused.participant')
  handleParticipantRefused(event: RefusedParticipantEventPayload) {
    console.log('participant have refused', event);
  }
}
