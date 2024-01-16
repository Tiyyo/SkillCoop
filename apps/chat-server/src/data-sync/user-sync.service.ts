import { Inject, Injectable } from '@nestjs/common';
import { getFormattedUTCTimestamp } from '@skillcoop/date-handler';
import { Kysely } from 'kysely';
import { DB } from '../database/database';
import { UserQueuePublisher } from '@skillcoop/types';

@Injectable()
export class UserSyncService {
  private tableName = 'user' as const;
  constructor(@Inject('dbClient') protected dbClient: Kysely<DB>) { }

  async create(data: UserQueuePublisher) {
    console.log('Create a new user');
    const todayUTCString = getFormattedUTCTimestamp();

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
  }
  async update(data: UserQueuePublisher) {
    console.log('Update a user');
    const todayUTCString = getFormattedUTCTimestamp();
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
  }
  async delete(data: UserQueuePublisher) {
    console.log('delete a user');
    const result = await this.dbClient
      .deleteFrom(this.tableName)
      .where('user_id', '=', data.profile_id)
      .executeTakeFirst();

    return !!Number(result.numDeletedRows);
  }
}
