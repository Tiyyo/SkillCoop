import { Injectable } from '@nestjs/common';
import { ParticipantQueuePublisher } from '@skillcoop/types';
import { ParticipantSyncService } from 'src/data-sync/participant-sync.service';

@Injectable()
export class ParticipantQueueDispatcher {
  constructor(private participantSyncService: ParticipantSyncService) { }

  async dispatch(data: ParticipantQueuePublisher) {
    switch (data.action) {
      case 'add_participant':
        return this.participantSyncService.addParticipant(data);
      case 'remove_participant':
        return this.participantSyncService.removeParticipant(data);
    }
  }
}
