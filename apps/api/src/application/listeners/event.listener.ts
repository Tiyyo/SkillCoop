import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InvitedEventNotificationService } from 'src/domain/services/notification/subtype/invited-event.notification.service';
import { TeamGeneratedNotificationService } from 'src/domain/services/notification/subtype/team-generated.notification.service';
import { UpdatedEventInfosNotificationService } from 'src/domain/services/notification/subtype/updated-event-infos.notification.service';
import {
  EventCreatedEventPayload,
  EventDeletedEventPayload,
  EventUpdatedEventPayload,
  TeamGeneratedEventPayload,
} from 'src/domain/shared/event-payload.types';
import { ProducerEventMessageService } from 'src/infrastructure/publishers/event.publisher';

@Injectable()
export class EventListener {
  constructor(
    private readonly teamGeneratedService: TeamGeneratedNotificationService,
    private readonly invitedEventService: InvitedEventNotificationService,
    private readonly updatedEventInfosService: UpdatedEventInfosNotificationService,
    private readonly producerEventMessageService: ProducerEventMessageService,
  ) {}
  @OnEvent('event.created')
  handleEventCreated(payload: EventCreatedEventPayload) {
    this.invitedEventService.notify(payload.eventId, payload.participantsIds);
    this.producerEventMessageService.pushToEventQueue({
      event_id: payload.eventId,
      organizer_id: payload.organizerId,
      participants_id: payload.participantsIds,
      action: 'create_event',
    });
  }
  @OnEvent('event.updated')
  handleEventUpdated(payload: EventUpdatedEventPayload) {
    this.updatedEventInfosService.notify(payload.eventId);
  }
  @OnEvent('event.deleted')
  handleEventDeleted(payload: EventDeletedEventPayload) {
    this.producerEventMessageService.pushToEventQueue({
      event_id: payload.eventId,
      organizer_id: payload.organizerId,
      action: 'delete_event',
    });
  }
  @OnEvent('team.generated')
  handleTeamGenerated(payload: TeamGeneratedEventPayload) {
    this.teamGeneratedService.notify(payload.eventId);
  }
}
