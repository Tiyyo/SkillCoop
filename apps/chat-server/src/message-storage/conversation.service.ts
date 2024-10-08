import { Inject, Injectable, Logger } from '@nestjs/common';
import { getFormattedUTCTimestamp } from '@skillcoop/date-handler';
import { Kysely, sql } from 'kysely';
import { DB } from 'src/database/database';
import {
  Conversation,
  typeConversationAssert,
  CreateGroupConversation,
  CreateOneToOneConversation,
  DeleteConversation,
  AddParticipantGroupConversation,
  RemoveParticipantGroupConversation,
  UpdateblePropsUserOnConversation,
  UpdateUserOnConversationConditions
} from '@skillcoop/types'
import { assertIsConversation } from 'src/utils/utils.type';
import { jsonArrayFrom } from 'kysely/helpers/sqlite';


@Injectable()
export class ConversationService {
  constructor(@Inject('dbClient') protected dbClient: Kysely<DB>, private readonly logger: Logger) { }
  async getConversation(conversationId: number) {
    try {
      const conversation = await this.dbClient
        .selectFrom('conversation')
        .select([
          'conversation.conversation_id',
          'conversation.event_id',
          'conversation.created_at',
          'conversation.type_name',
          'conversation.title',
          'conversation.last_update'])
        .innerJoin('user_on_conversation as participants', 'conversation.conversation_id', 'participants.conversation_id')
        .innerJoin('user', 'participants.user_id', 'user.user_id')
        .select(({ eb }) => [
          jsonArrayFrom(
            eb.selectFrom('user_on_conversation')
              .select([
                'user_on_conversation.user_id',
                'user.avatar',
                'user.username',
                'user_on_conversation.is_admin',
              ])
              .whereRef('user_on_conversation.conversation_id', '=', 'conversation.conversation_id')
              .innerJoin('user', 'user_on_conversation.user_id', 'user.user_id')
          ).as('participants_list'),
        ])
        .where('conversation.conversation_id', '=', conversationId)
        .groupBy(['conversation.conversation_id', 'conversation.created_at', 'conversation.last_update', 'conversation.event_id', 'conversation.type_name', 'conversation.title'])
        .executeTakeFirst();

      assertIsConversation(conversation)

      return conversation
    } catch (error) {
      this.logger.error('Could not get conversation ' + conversationId + ' ' + error.message)
    }
  }
  async getList(user_id: string) {
    try {
      const result = await sql`SELECT conversation.conversation_id,
       conversation.title,
       conversation.type_name,
       conversation.last_update,
       (SELECT user_on_conversation.last_seen
        FROM user_on_conversation
        WHERE user_on_conversation.conversation_id = conversation.conversation_id
        AND user_on_conversation.user_id = ${user_id}
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
                'user_id', message.user_id,
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
  AND user_on_conversation.user_id = ${user_id}
  )
GROUP BY conversation.conversation_id
ORDER BY conversation.last_update DESC
`.execute(this.dbClient);

      return result.rows as Conversation[];
    } catch (error) {
      this.logger.error('Could not get conversation list for user :' + user_id + ' ' + error.message)
    }
  }
  async createOneToOne(data: CreateOneToOneConversation) {
    const todayUTCString = getFormattedUTCTimestamp();
    try {
      const conversationId = await this.dbClient.transaction().execute(async (trx) => {
        const newConversation = await trx
          .insertInto('conversation')
          .values({ type_name: 'oneToOne', created_at: todayUTCString })
          .returning('conversation_id')
          .executeTakeFirst();

        await trx
          .insertInto('user_on_conversation')
          .values([
            {
              conversation_id: newConversation.conversation_id,
              user_id: data.user_id_one,
              is_admin: 1,
              created_at: todayUTCString,
            },
            {
              conversation_id: newConversation.conversation_id,
              user_id: data.user_id_two,
              is_admin: 1,
              created_at: todayUTCString,
            },
          ])
          .executeTakeFirst();
        return newConversation.conversation_id
      });
      return { conversationId }
    } catch (error) {
      this.logger.error('Could not create conversation between ' + data.user_id_one + ' and ' + data.user_id_two + ' ' + error.message)
    }
  }
  async createGroup(data: CreateGroupConversation) {
    const todayUTCString = getFormattedUTCTimestamp();
    try {
      const conversationId = await this.dbClient.transaction().execute(async (trx) => {
        const newConversation = await trx
          .insertInto('conversation')
          .values({ type_name: typeConversationAssert.group, created_at: todayUTCString, title: data.title })
          .returning('conversation_id')
          .executeTakeFirst();

        await trx
          .insertInto('user_on_conversation')
          .values([
            {
              conversation_id: newConversation.conversation_id,
              user_id: data.creator.userId,
              is_admin: 1,
              created_at: todayUTCString,
            },
          ]).executeTakeFirst();

        await trx
          .insertInto('user_on_conversation')
          .values(
            data.participants.map((p) => ({
              conversation_id: newConversation.conversation_id,
              user_id: p.userId,
              is_admin: 0,
              created_at: todayUTCString,
            })),
          )
          .executeTakeFirst();
        return newConversation.conversation_id
      });
      return { conversationId }
    } catch (error) {
      this.logger.error('Could not create group conversation ' + error.message)
    }
  }
  async deleteGroup(data: DeleteConversation) {

    try {
      const creators = await this.dbClient
        .selectFrom('user_on_conversation')
        .select('user_id')
        .where('conversation_id', '=', data.conversation_id)
        .where('is_admin', '=', 1)
        .execute();

      const adminIds = creators.map((creator) => {
        return creator.user_id;
      });

      // TODO : return an unauthorized error message
      if (!adminIds.includes(data.user_id)) return;

      const result = await this.dbClient
        .deleteFrom('conversation')
        .where('conversation_id', '=', data.conversation_id)
        .executeTakeFirst();


      return !!Number(result.numDeletedRows);
    } catch (error) {
      this.logger.error('Could not delete group conversation ' + data.conversation_id + ' ' + error.message)
    }
  }
  async addToGroup(data: AddParticipantGroupConversation) {
    const todayUTCString = getFormattedUTCTimestamp();

    try {
      await this.dbClient
        .insertInto('user_on_conversation')
        .values(
          data.participants_ids.map((id) => ({
            created_at: todayUTCString,
            is_admin: 0,
            user_id: id,
            conversation_id: data.conversation_id,
          })),
        )
        .execute();
    } catch (error) {
      this.logger.error('Could not add users to group conversation ' + data.conversation_id + ' ' + error.message)
    }
  }
  async removeFromGroup(data: RemoveParticipantGroupConversation) {
    try {
      const creators = await this.dbClient
        .selectFrom('user_on_conversation')
        .select('user_id')
        .where('conversation_id', '=', data.conversation_id)
        .where('is_admin', '=', 1)
        .execute();

      const adminIds = creators.map((creator) => {
        return creator.user_id;
      });

      // TODO : return an unauthorized error message
      if (!adminIds.includes(data.participant_id)) return;

      if (adminIds.length === 1 && adminIds[0] === data.participant_id) {
        const participants = await this.dbClient
          .selectFrom('user_on_conversation')
          .select('user_id')
          .where('conversation_id', '=', data.conversation_id)
          .where('is_admin', '=', 0)
          .execute();

        if (participants.length > 1) {
          const participantsIds = participants.map((participant) => {
            return participant.user_id;
          });

          await this.dbClient
            .updateTable('user_on_conversation')
            .set({ is_admin: 1 })
            .where('conversation_id', '=', data.conversation_id)
            .where('user_id', '=', participantsIds[0])
            .executeTakeFirst();
        }
      }

      const result = await this.dbClient
        .deleteFrom('user_on_conversation')
        .where('conversation_id', '=', data.conversation_id)
        .where('user_id', '=', data.participant_id)
        .executeTakeFirst();

      return !!Number(result.numDeletedRows);
    } catch (error) {
      this.logger.error('Could not remove user from group conversation ' + data.conversation_id + ' ' + error.message)
    }
  }
  async updateUserOnConversation(conditions: UpdateUserOnConversationConditions, updateDate: UpdateblePropsUserOnConversation) {
    try {
      const isUpdated = await this.dbClient
        .updateTable('user_on_conversation')
        .set(updateDate)
        .where('conversation_id', '=', conditions.conversation_id)
        .where('user_id', '=', conditions.user_id)
        .executeTakeFirst();

      return !!Number(isUpdated.numUpdatedRows);
    } catch (error) {
      this.logger.error('Could not update user on conversation ' + conditions.conversation_id + ' ' + error.message)
    }
  }
  async searchOneToOne(data: CreateOneToOneConversation) {
    try {
      const result = await this.dbClient
        .selectFrom('conversation')
        .select('conversation.conversation_id')
        .innerJoin('user_on_conversation as uc1', 'conversation.conversation_id', 'uc1.conversation_id')
        .innerJoin('user_on_conversation as uc2', 'conversation.conversation_id', 'uc2.conversation_id')
        .where('conversation.type_name', '=', 'oneToOne')
        .where('uc1.user_id', '=', data.user_id_one)
        .where('uc2.user_id', '=', data.user_id_two)
        .groupBy('conversation.conversation_id')
        .executeTakeFirst();
      // TODO : replace null by custom expection RessourceNotFound
      return result ? result : null
    } catch (error) {
      this.logger.error('Could not search for one to one conversation ' + error.message)
    }
  }
  async getConversationIdByEvent(eventId: number) {
    try {
      const conversationId = await this.dbClient
        .selectFrom('conversation')
        .select('conversation_id')
        .where('event_id', '=', eventId)
        .executeTakeFirst();

      return conversationId.conversation_id ? conversationId.conversation_id : null
    } catch (error) {
      this.logger.error('Could not get conversation by event ' + eventId + ' ' + error.message)
    }
  }
}
