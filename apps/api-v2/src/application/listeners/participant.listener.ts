import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InvitedEventNotificationService } from 'src/domain/services/notification/subtype/invited-event.notification.service';
import {
  EventRequestEventPayload,
  InvitationEventSentEventPayload,
  RefusedParticipantEventPayload,
} from 'src/domain/shared/event-payload.types';

@Injectable()
export class ParticipantListener {
  constructor(
    private readonly invitedEventService: InvitedEventNotificationService,
  ) { }
  @OnEvent('invitation.event.sent')
  handleSendInvitationParticipant(event: InvitationEventSentEventPayload) {
    this.invitedEventService.notify(event.eventId, event.participantsIds);
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
