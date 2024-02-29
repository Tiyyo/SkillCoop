import { Inject, Injectable } from '@nestjs/common';
import { SendInvitationEventDTO } from 'src/application/dto/send-invitation-event.dto';
import { SendRequestEventDTO } from 'src/application/dto/send-request-event.dto';
import { UpdateParticipantStatusDTO } from 'src/application/dto/update-status.dto';
import { RessourceNotFoundException } from 'src/application/exceptions/ressource-not-found.exception';
import { EmitEventInterface } from 'src/application/services/event.service';
import { EventParticipantStatusManagerService } from 'src/domain/services/event-participant/event-participant-status.service';
import { EventParticipantService } from 'src/domain/services/event-participant/event-participant.service';
import { EventParticipantAdapter } from 'src/infrastructure/kysely/adapters/event-participant.adapter';
import { EventQueriesAdapter } from 'src/infrastructure/kysely/adapters/event.queries.adapter';

@Injectable()
export class EventParticipantUseCases {
  constructor(
    private readonly eventParticipantService: EventParticipantService,
    private readonly eventParticipantAdapter: EventParticipantAdapter,
    private readonly eventQueriesAdapter: EventQueriesAdapter,
    private readonly participantStatusManager: EventParticipantStatusManagerService,
    @Inject('EmitEventService') private eventEmitter: EmitEventInterface,
  ) {}
  async updateStatus(data: UpdateParticipantStatusDTO) {
    const event = await this.eventQueriesAdapter.findOne({
      id: data.event_id,
    });
    if (!event) {
      throw new RessourceNotFoundException(
        'Could not find event related to this participant',
        'EventParrticipantUsecases',
      );
    }
    return await this.participantStatusManager.handle(
      event,
      data.profile_id,
      data.status_name,
    );
  }
  async sendInvitation(data: SendInvitationEventDTO) {
    const invitations = data.ids.map((id: string) => ({
      profile_id: id,
      event_id: data.event_id,
      status_name: 'pending',
    }));
    await this.eventParticipantAdapter.createMany(invitations);

    return this.eventEmitter.invitationEventSent({
      eventId: data.event_id,
      participantsIds: data.ids,
      instigatorId: data.initiator,
    });
  }
  async sendRequest(data: SendRequestEventDTO) {
    this.eventParticipantService.updateStatusToRequested(
      data.event_id,
      data.profile_id,
    );
    return this.eventEmitter.requsetEventSent({
      eventId: data.event_id,
      instigatorId: data.profile_id,
    });
  }
}
