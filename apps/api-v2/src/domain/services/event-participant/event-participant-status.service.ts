import { Injectable } from '@nestjs/common';
import { EventCoreEntity } from 'src/domain/entities/event.entity';
import { EventParticipantConfirmedService } from './event-participant.confirmed.service';
import { EventParticipantDeclinedService } from './event-participant.declined.service';
import { EventParticipantPendingService } from './event-participant-pending.service';
import { ApplicationException } from 'src/application/exceptions/application.exception';
import { EventParticipantService } from './event-participant.service';

@Injectable()
export class EventParticipantStatusManagerService {
  constructor(
    private readonly confirmedParticipantService: EventParticipantConfirmedService,
    private readonly declinedParticipantService: EventParticipantDeclinedService,
    private readonly pendingParticipantService: EventParticipantPendingService,
    private readonly eventParticipantService: EventParticipantService,
  ) { }
  async handle(
    event: EventCoreEntity & { id: number },
    profileId: string,
    status: string,
  ) {
    switch (status) {
      case 'pending':
        return await this.pendingParticipantService.handle(event, profileId);
      case 'declined':
        return await this.declinedParticipantService.handle(event, profileId);
      case 'confirmed':
        return await this.confirmedParticipantService.handle(event, profileId);
      case 'refused':
        return await this.eventParticipantService.refuseParticipant(
          event.id,
          profileId,
        );
      default:
        throw new ApplicationException(
          `${status} is not handle , expected pending, declined or confirmed`,
          'EventParticipantStatusManagerService',
        );
    }
  }
}
