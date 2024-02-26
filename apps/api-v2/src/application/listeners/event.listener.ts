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

@Injectable()
export class EventListener {
  constructor(
    private readonly teamGeneratedService: TeamGeneratedNotificationService,
    private readonly invitedEventService: InvitedEventNotificationService,
    private readonly updatedEventInfosService: UpdatedEventInfosNotificationService,
  ) { }
  @OnEvent('event.created')
  handleEventCreated(payload: EventCreatedEventPayload) {
    this.invitedEventService.notify(payload.eventId, payload.participantsIds);
  }
  @OnEvent('event.updated')
  handleEventUpdated(payload: EventUpdatedEventPayload) {
    this.updatedEventInfosService.notify(payload.eventId);
  }
  @OnEvent('event.deleted')
  handleEventDeleted(payload: EventDeletedEventPayload) {
    console.log('event deleted', payload);
  }
  @OnEvent('team.generated')
  handleTeamGenerated(payload: TeamGeneratedEventPayload) {
    this.teamGeneratedService.notify(payload.eventId);
  }
}
