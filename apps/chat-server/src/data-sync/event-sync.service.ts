import { Inject, Injectable, Logger } from '@nestjs/common';
import { getFormattedUTCTimestamp } from '@skillcoop/date-handler';
import { Kysely } from 'kysely';
import { DB } from '../database/database';
import { EventQueuePublisher } from '@skillcoop/types';


@Injectable()
export class EventSyncService {
  private tableName = 'conversation' as const;
  constructor(@Inject('dbClient') protected dbClient: Kysely<DB>, private readonly logger: Logger) { }

  async create(data: EventQueuePublisher) {
    const todayUTCString = getFormattedUTCTimestamp();

    try {
      await this.dbClient.transaction().execute(async (trx) => {
        const newConversation = await trx
          .insertInto(this.tableName)
          .values({
            title: data.title ? data.title : `Event #${data.event_id}`,
            type_name: 'event',
            event_id: data.event_id,
            created_at: todayUTCString,
          })
          .returning('conversation_id')
          .executeTakeFirstOrThrow();

        if (!data.participants_id || data.participants_id.length === 0) {
          return
        }
        await trx
          .insertInto('user_on_conversation')
          .values(
            data.participants_id.map((id) => ({
              user_id: id,
              conversation_id: newConversation.conversation_id,
              is_admin: data.organizer_id === id ? 1 : 0,
              created_at: todayUTCString,
            })),
          )
          .executeTakeFirst();
      });
    } catch (error) {
      this.logger.error('Could not sync database and create event conversation' + error.message)
    }
  }
  async delete(data: EventQueuePublisher) {
    try {
      const result = await this.dbClient
        .deleteFrom('conversation')
        .where('event_id', '=', data.event_id)
        .executeTakeFirst();

      return !!Number(result.numDeletedRows);
    } catch (error) {
      this.logger.error('Could not sync database and delete event conversation' + error.message)
    }
  }
}
