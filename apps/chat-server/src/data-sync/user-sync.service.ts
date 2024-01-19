import { Inject, Injectable, Logger } from '@nestjs/common';
import { getFormattedUTCTimestamp } from '@skillcoop/date-handler';
import { Kysely } from 'kysely';
import { DB } from '../database/database';
import { UserQueuePublisher } from '@skillcoop/types';

@Injectable()
export class UserSyncService {
  private tableName = 'user' as const;
  constructor(@Inject('dbClient') protected dbClient: Kysely<DB>, private readonly logger: Logger) { }

  async create(data: UserQueuePublisher) {
    const todayUTCString = getFormattedUTCTimestamp();
    try {
      const [result] = await this.dbClient
        .insertInto(this.tableName)
        .values({
          user_id: data.profile_id,
          avatar: data.avatar,
          username: data.username,
          created_at: todayUTCString,
        })
        .execute();

      return result;
    } catch (error) {
      this.logger.error('Could not sync database and create new user' + data.profile_id + ' ' + error.message)
    }

  }
  async update(data: UserQueuePublisher) {
    const todayUTCString = getFormattedUTCTimestamp();
    try {
      const result = await this.dbClient
        .updateTable(this.tableName)
        .set({
          avatar: data.avatar,
          username: data.username,
          updated_at: todayUTCString,
        })
        .where('user_id', '=', data.profile_id)
        .executeTakeFirst();

      return !!Number(result.numUpdatedRows);
    } catch (error) {
      this.logger.error('Could not sync database and update user ' + data.profile_id + ' ' + error.message)
    }

  }
  async delete(data: UserQueuePublisher) {
    try {
      const result = await this.dbClient
        .deleteFrom(this.tableName)
        .where('user_id', '=', data.profile_id)
        .executeTakeFirst();

      return !!Number(result.numDeletedRows);
    } catch (error) {
      this.logger.error('Could not sync database and delete user ' + data.profile_id + ' ' + error.message)
    }

  }
}
