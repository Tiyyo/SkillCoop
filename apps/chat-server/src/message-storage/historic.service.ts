import { Inject, Injectable } from '@nestjs/common';
import { Kysely } from 'kysely';
import { jsonArrayFrom } from 'kysely/helpers/sqlite';
import { DB } from 'src/database/database';

@Injectable()
export class HistoricService {
  constructor(@Inject('dbClient') protected dbClient: Kysely<DB>) { }
  async get(data: { conversationId: number }) {
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
        .where('conversation.conversation_id', '=', data.conversationId)
        .groupBy('conversation.conversation_id')

        .execute();

      const historic = {
        ...result[0],
        messages: JSON.parse((result[0] as any).messages),
      };

      return historic;
    } catch (error) {
      console.log(error);
    }
  }
}
