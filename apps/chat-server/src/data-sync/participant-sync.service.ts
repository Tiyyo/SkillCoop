import { Inject, Injectable } from '@nestjs/common';
import { getFormattedUTCTimestamp } from '@skillcoop/date-handler';
import { Kysely } from 'kysely';
import { DB } from '../database/database';
import { ParticipantQueuePublisher } from '@skillcoop/types';

@Injectable()
export class ParticipantSyncService {
  private tableName = 'user_on_conversation' as const;
  constructor(@Inject('dbClient') protected dbClient: Kysely<DB>) { }

  async addParticipant(data: ParticipantQueuePublisher) {
    console.log('Should sync by add a participant');
  }
  async removeParticipant(data: ParticipantQueuePublisher) {
    console.log('Should sync by removing a participant');
  }
}
