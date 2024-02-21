import { getFormattedUTCTimestamp } from '@skillcoop/date-handler';
import { Core } from './core.js';
import { tableNames } from '../@types/types.js';
import { User as TUser } from '@skillcoop/types';
import { db } from '../helpers/client.db.js';
import { userQueuePublisher } from '../publishers/user.publisher.js';
import DatabaseError from '../helpers/errors/database.error.js';
import ServerError from '../helpers/errors/server.error.js';
import NotFoundError from '../helpers/errors/not-found.error.js';

export class User extends Core<typeof tableNames.user> {
  declare tableName: typeof tableNames.user;

  constructor(client: typeof db) {
    super(client);
    this.tableName = tableNames.user;
  }
  async create(data: { password: string; email: string }) {
    const todayUTCString = getFormattedUTCTimestamp();
    const insertValues = {
      ...data,
      created_at: todayUTCString,
    };
    try {
      const [result] = await this.client
        .insertInto(this.tableName)
        .values(insertValues)
        .returning(['id', 'email'])
        .execute();
      if (!result) throw new Error('Could not create user');
      await userQueuePublisher({
        profile_id: result.id,
        username: '',
        avatar: null,
        action: 'create',
      });
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new DatabaseError(error);
      }
    }
  }
  async blockUserAccount(email: string) {
    const todayUTCString = getFormattedUTCTimestamp();
    const [result] = await this.client
      .updateTable(this.tableName)
      .set({ blocked: 1, updated_at: todayUTCString })
      .where('email', '=', email)
      .returning(['failed_attempts', 'blocked'])
      .execute();
    const isUpdated = result?.blocked === 1;

    if (!isUpdated)
      throw new ServerError(
        'User account should be blocked but database is not updated',
      );
    return result as Partial<TUser>;
  }
  async increaseFailedLoginAttempts(email: string) {
    const todayUTCString = getFormattedUTCTimestamp();

    const user = await this.findOne({ email });
    if (!user) throw new NotFoundError('User not found');

    const result = await this.client
      .updateTable(this.tableName)
      .set({
        failed_attempts: user.failed_attempts + 1,
        updated_at: todayUTCString,
      })
      .where('email', '=', email)
      .returning(['failed_attempts', 'blocked'])
      .executeTakeFirst();

    const isUpdated = result?.failed_attempts === user?.failed_attempts + 1;
    if (!isUpdated)
      throw new ServerError('Failed to update failed login attempts');
    return result as Partial<TUser>;
  }
  async resetFailedLoginAttempts(email: string) {
    const todayUTCString = getFormattedUTCTimestamp();
    await this.client
      .updateTable(this.tableName)
      .set({ failed_attempts: 0, updated_at: todayUTCString })
      .where('email', '=', email)
      .returning(['failed_attempts', 'blocked'])
      .execute();
  }
}
