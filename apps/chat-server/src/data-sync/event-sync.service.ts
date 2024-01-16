import { Inject, Injectable } from '@nestjs/common';
import { getFormattedUTCTimestamp } from '@skillcoop/date-handler';
import { Kysely } from 'kysely';
import { DB } from '../database/database';
import { EventQueuePublisher } from '@skillcoop/types';

@Injectable()
export class EventSyncService {
  private tableName = 'conversation' as const;
  constructor(@Inject('dbClient') protected dbClient: Kysely<DB>) { }

  async create(data: EventQueuePublisher) {
    const todayUTCString = getFormattedUTCTimestamp();
    console.log(this.tableName);
    console.log('Should sync by create a conversation with an event id');
  }
  async delete(data: EventQueuePublisher) {
    console.log(this.tableName);
    console.log('Should sync by deleting a conversation');
  }
}
