import { Inject, Injectable, Logger } from '@nestjs/common';
import { getFormattedUTCTimestamp } from '@skillcoop/date-handler';
import { Kysely, sql } from 'kysely';
import { DB } from 'src/database/database';

type ChatParticipant = {
  user_id: number;
  avatar: string | null;
  username: string;
  is_admin?: number;
};

type ChatMessage = {
  message_id: number;
  user_id: number;
  avatar: string | null;
  username: string;
  content: string;
  created_at: string;
  updated_at?: string | null;
};

type Conversation = {
  conversation_id: number;
  last_update: string | null;
  last_seen: string | null;
  title: string | null;
  type_name: string;
  participant_list: ChatParticipant[];
  messages: ChatMessage[];
  last_message: ChatMessage;
};

@Injectable()
export class ConversationService {
  constructor(@Inject('dbClient') protected dbClient: Kysely<DB>, private readonly logger: Logger) { }
  async getConversation(conversationId: number) {
    try {
      const result = await sql`
SELECT c.conversation_id,
       c.event_id,
       c.created_at,
       c.type_name,
       c.title,
       json_group_array(
          json_object(
            'user_id', participants.user_id,
            'avatar', user.avatar,
            'username', user.username
          )
        ) AS participants_list
FROM conversation as c
INNER JOIN user_on_conversation as participants ON c.conversation_id = participants.conversation_id
INNER JOIN user ON participants.user_id = user.user_id
WHERE c.conversation_id = ${conversationId}
GROUP BY c.conversation_id, c.created_at, c.last_update, c.event_id, c.type_name, c.title
`.execute(this.dbClient);

      const extractedConv = result.rows[0] as object;
      const conversation = {
        ...extractedConv,
        participants_list: (extractedConv as any).participants_list
          ? JSON.parse((extractedConv as any).participants_list)
          : [],
      };

      return conversation;
    } catch (error) {
      this.logger.error('Could not get conversation ' + conversationId + ' ' + error.message)
    }
  }
  async getList(id: number) {
    try {
      const result = await sql`SELECT conversation.conversation_id,
       conversation.title,
       conversation.type_name,
       conversation.last_update,
       (SELECT user_on_conversation.last_seen
        FROM user_on_conversation
        WHERE user_on_conversation.conversation_id = conversation.conversation_id
        AND user_on_conversation.user_id = ${id}
       ) AS last_seen,
       json_group_array(
          json_object(
            'user_id', participants.user_id,
            'avatar', user.avatar,
            'username', user.username
          )
        ) AS participants_list,
       ( SELECT
            json_object(
                'avatar', user.avatar,
                'username' , user.username,
                'content' , message.message,
                'created_at', message.created_at
            )
         FROM message 
         INNER JOIN user ON message.user_id = user.user_id
         WHERE message.conversation_id = conversation.conversation_id
         ORDER BY message.created_at DESC
         LIMIT 1
        ) AS last_message
FROM conversation
INNER JOIN user_on_conversation as participants ON conversation.conversation_id = participants.conversation_id
INNER JOIN user ON participants.user_id = user.user_id
WHERE EXISTS (
  SELECT 1
  FROM user_on_conversation
  WHERE user_on_conversation.conversation_id = conversation.conversation_id
  AND user_on_conversation.user_id = ${id}
  )
GROUP BY conversation.conversation_id
ORDER BY conversation.last_update DESC
`.execute(this.dbClient);

      const conversations = result.rows.map((conversation: any) => ({
        ...conversation,
        participants_list: conversation.participants_list
          ? JSON.parse(conversation.participants_list)
          : [],
        last_message: conversation.last_message
          ? JSON.parse(conversation.last_message)
          : null,
      }));
      return conversations as Conversation[];
    } catch (error) {
      this.logger.error('Could not get conversation list for user :' + id + ' ' + error.message)
    }
  }
  async createOneToOne(data: { userIdOne: number; userIdTwo: number }) {
    const todayUTCString = getFormattedUTCTimestamp();
    try {
      await this.dbClient.transaction().execute(async (trx) => {
        const newConversation = await trx
          .insertInto('conversation')
          .values({ type_name: 'oneToOne', created_at: todayUTCString })
          .returning('conversation_id')
          .executeTakeFirst();

        return await trx
          .insertInto('user_on_conversation')
          .values([
            {
              conversation_id: newConversation.conversation_id,
              user_id: data.userIdOne,
              is_admin: 1,
              created_at: todayUTCString,
            },
            {
              conversation_id: newConversation.conversation_id,
              user_id: data.userIdTwo,
              is_admin: 1,
              created_at: todayUTCString,
            },
          ])
          .executeTakeFirst();
      });
    } catch (error) {
      this.logger.error('Could not create conversation between ' + data.userIdOne + ' and ' + data.userIdTwo + ' ' + error.message)
    }
  }
  async createGroup(data: { creatorId: number; ids?: number[] }) {
    const todayUTCString = getFormattedUTCTimestamp();
    try {
      await this.dbClient.transaction().execute(async (trx) => {
        const newConversation = await trx
          .insertInto('conversation')
          .values({ type_name: 'group', created_at: todayUTCString })
          .returning('conversation_id')
          .executeTakeFirst();

        return await trx
          .insertInto('user_on_conversation')
          .values(
            data.ids.map((id) => ({
              conversation_id: newConversation.conversation_id,
              user_id: id,
              is_admin: data.creatorId === id ? 1 : 0,
              created_at: todayUTCString,
            })),
          )
          .executeTakeFirst();
      });
    } catch (error) {
      this.logger.error('Could not create group conversation ' + error.message)
    }
  }
  async deleteGroup(data: { conversationId: number; userId: number }) {
    try {
      // find organizer first
      const creator = await this.dbClient
        .selectFrom('user_on_conversation')
        .select('user_id')
        .where('conversation_id', '=', data.conversationId)
        .where('is_admin', '=', 1)
        .executeTakeFirst();

      if (creator.user_id !== data.userId) return;

      const result = await this.dbClient
        .deleteFrom('conversation')
        .where('conversation_id', '=', data.conversationId)
        .executeTakeFirst();

      return !!Number(result.numDeletedRows);
    } catch (error) {
      this.logger.error('Could not delete group conversation ' + data.conversationId + ' ' + error.message)
    }
  }
  async addToGroup(data: { conversationId: number; ids: number[] }) {
    const todayUTCString = getFormattedUTCTimestamp();

    try {
      await this.dbClient
        .insertInto('user_on_conversation')
        .values(
          data.ids.map((id) => ({
            created_at: todayUTCString,
            is_admin: 0,
            user_id: id,
            conversation_id: data.conversationId,
          })),
        )
        .execute();
    } catch (error) {
      this.logger.error('Could not add users to group conversation ' + data.conversationId + ' ' + error.message)
    }
  }
  async removeFromGroup(data: { userId: number; conversationId: number }) {
    try {
      const creator = await this.dbClient
        .selectFrom('user_on_conversation')
        .select('user_id')
        .where('conversation_id', '=', data.conversationId)
        .where('is_admin', '=', 1)
        .executeTakeFirst();

      if (creator.user_id !== data.userId) return;

      const result = await this.dbClient
        .deleteFrom('user_on_conversation')
        .where('conversation_id', '=', data.conversationId)
        .where('user_id', '=', data.userId)
        .executeTakeFirst();

      return !!Number(result.numDeletedRows);
    } catch (error) {
      this.logger.error('Could not remove user from group conversation ' + data.conversationId + ' ' + error.message)
    }
  }
  async updateUserOnConversation(clauses: { conversationId: number, userId: number }, updateDate: any) {
    try {
      const isUpdated = await this.dbClient
        .updateTable('user_on_conversation')
        .set(updateDate)
        .where('conversation_id', '=', clauses.conversationId)
        .where('user_id', '=', clauses.userId)
        .executeTakeFirst();

      return !!Number(isUpdated.numUpdatedRows);
    } catch (error) {
      this.logger.error('Could not update user on conversation ' + clauses.conversationId + ' ' + error.message)
    }
  }
}
