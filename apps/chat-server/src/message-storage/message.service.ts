import { Inject, Injectable, Logger } from '@nestjs/common';
import { getFormattedUTCTimestamp } from '@skillcoop/date-handler';
import { Kysely } from 'kysely';
import { DB } from 'src/database/database';

@Injectable()
export class MessageService {
  constructor(@Inject('dbClient') protected dbClient: Kysely<DB>, private readonly logger: Logger) { }
  async store(data: {
    content: string;
    sender: number;
    conversationId: number;
  }) {
    const todayUTCString = getFormattedUTCTimestamp();
    try {
      const result = await this.dbClient
        .insertInto('message')
        .values({
          message: data.content,
          user_id: data.sender,
          created_at: todayUTCString,
          conversation_id: data.conversationId,
        })
        .executeTakeFirst();

      await this.dbClient.updateTable('conversation')
        .set({
          last_update: todayUTCString,
        }).where('conversation_id', '=', data.conversationId)
        .executeTakeFirst();

      return result;
    } catch (error) {
      this.logger.error('Could not store message ' + data.content + ' ' + error.message)
    }
  }
  async update(data: { messageId: number; content: string }) {
    const todayUTCString = getFormattedUTCTimestamp();
    try {
      const result = await this.dbClient
        .updateTable('message')
        .set({
          message: data.content,
          updated_at: todayUTCString,
        })
        .where('message_id', '=', data.messageId)
        .executeTakeFirst();

      return !!Number(result.numUpdatedRows);
    } catch (error) {
      this.logger.error('Could not update message ' + data.messageId + ' ' + error.message)
    }
  }
  async delete(data: { messageId: number }) {
    try {
      const result = await this.dbClient
        .deleteFrom('message')
        .where('message_id', '=', data.messageId)
        .executeTakeFirst();

      return !!Number(result.numDeletedRows);
    } catch (error) {
      this.logger.error('Could not delete message ' + data.messageId + ' ' + error.message)
    }
  }
}
