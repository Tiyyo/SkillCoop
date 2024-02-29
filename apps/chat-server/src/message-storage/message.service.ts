import { Inject, Injectable, Logger } from '@nestjs/common';
import { getFormattedUTCTimestamp } from '@skillcoop/date-handler';
import { Kysely } from 'kysely';
import { DB } from 'src/database/database';
import { CreateMessageStore, UpdateMessage, DeleteMessage } from '@skillcoop/types/src'

@Injectable()
export class MessageService {
  constructor(@Inject('dbClient') protected dbClient: Kysely<DB>, private readonly logger: Logger) { }
  async store(data: CreateMessageStore) {
    const todayUTCString = getFormattedUTCTimestamp();
    try {
      const messageId = await this.dbClient.transaction().execute(async (trx) => {
        const result = await trx
          .insertInto('message')
          .values({
            message: data.content,
            user_id: data.sender,
            created_at: todayUTCString,
            conversation_id: data.conversation_id,
          })
          .returning('message_id')
          .executeTakeFirst();

        await trx
          .updateTable('conversation')
          .set({
            last_update: todayUTCString,
          }).where('conversation_id', '=', data.conversation_id)
          .executeTakeFirst();
        return result.message_id;
      });
      return messageId;
    } catch (error) {
      this.logger.error('Could not store message ' + data.content + ' ' + error.message)
    }
  }
  async update(data: UpdateMessage) {
    const todayUTCString = getFormattedUTCTimestamp();
    try {
      const messageUpdated = await this.dbClient
        .updateTable('message')
        .set({
          message: data.content,
          updated_at: todayUTCString,
        })
        .where('message_id', '=', data.message_id)
        .returning(['message_id', 'updated_at', 'message', 'created_at'])
        .executeTakeFirst();

      return messageUpdated;
    } catch (error) {
      this.logger.error('Could not update message ' + data.message_id + ' ' + error.message)
    }
  }
  async delete(data: DeleteMessage) {
    try {
      const result = await this.dbClient
        .deleteFrom('message')
        .where('message_id', '=', data.message_id)
        .executeTakeFirst();

      return !!Number(result.numDeletedRows);
    } catch (error) {
      this.logger.error('Could not delete message ' + data.message_id + ' ' + error.message)
    }
  }
}
