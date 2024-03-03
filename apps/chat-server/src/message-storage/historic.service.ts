import { Inject, Injectable, Logger } from '@nestjs/common';
import { Kysely } from 'kysely';
import { jsonArrayFrom } from 'kysely/helpers/sqlite';
import { DB } from 'src/database/database';
import { GroupMessageByService } from 'src/utils/message-groupby.service';

@Injectable()
export class HistoricService {
  constructor(@Inject('dbClient') protected dbClient: Kysely<DB>, private readonly logger: Logger, private readonly groupMessageBy: GroupMessageByService) { }
  async get(data: { conversation_id: number }) {
    try {
      const result = await this.dbClient
        .selectFrom('conversation')
        .select((eb) => [
          'conversation.conversation_id',
          jsonArrayFrom(
            eb
              .selectFrom('message')
              .innerJoin('user', 'user.user_id', 'message.user_id')
              .select([
                'message.message_id',
                'message.message',
                'message.created_at',
                'message.updated_at',
                'user.user_id',
                'user.username',
                'user.avatar',
              ])
              .whereRef(
                'message.conversation_id',
                '=',
                'conversation.conversation_id',
              )
              .orderBy('message.created_at', 'asc'),
          ).as('messages'),
        ])
        .where('conversation.conversation_id', '=', data.conversation_id)
        .groupBy('conversation.conversation_id')
        .executeTakeFirst();

      const parsedHistoric = { ...result, messages: this.groupMessageBy.groupByDateAndAuthor(result.messages) };

      return parsedHistoric;
    } catch (error) {
      this.logger.error('Could not get historic of conversation ' + data.conversation_id + ' ' + error.message)
    }
  }
}
