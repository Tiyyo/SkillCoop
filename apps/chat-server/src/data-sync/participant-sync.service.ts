import { Inject, Injectable, Logger } from '@nestjs/common';
import { getFormattedUTCTimestamp } from '@skillcoop/date-handler';
import { Kysely } from 'kysely';
import { DB } from '../database/database';
import { ParticipantQueuePublisher } from '@skillcoop/types';

@Injectable()
export class ParticipantSyncService {
  private tableName = 'user_on_conversation' as const;
  constructor(@Inject('dbClient') protected dbClient: Kysely<DB>, private readonly logger: Logger) { }

  async addParticipant(data: ParticipantQueuePublisher) {
    const todayUTCString = getFormattedUTCTimestamp();
    try {
      await this.dbClient.transaction().execute(async (trx) => {
        const conv = await trx
          .selectFrom('conversation')
          .select(['conversation_id'])
          .where('event_id', '=', data.event_id)
          .executeTakeFirst();

        return await trx
          .insertInto(this.tableName)
          .values(
            data.participants_id.map((id) => ({
              created_at: todayUTCString,
              conversation_id: conv.conversation_id,
              is_admin: 0,
              user_id: id,
            })),
          )
          .executeTakeFirst();
      });
    } catch (error) {
      this.logger.error('Could not sync database and add a participant into a conversation' + error.message)
    }
  }
  async removeParticipant(data: ParticipantQueuePublisher) {
    try {
      await this.dbClient.transaction().execute(async (trx) => {
        const conv = await trx
          .selectFrom('conversation')
          .select(['conversation_id'])
          .where('event_id', '=', data.event_id)
          .executeTakeFirst();

        return await trx
          .deleteFrom(this.tableName)
          .where('conversation_id', '=', conv.conversation_id)
          .where('user_id', '=', data.participants_id[0])
          .executeTakeFirst();
      });
    } catch (error) {
      this.logger.error('Could not sync database and delete a participant into a conversation' + error.message)
    }
  }
}
