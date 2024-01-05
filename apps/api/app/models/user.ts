// import { DBClientType } from '../@types/types.database';
import { getFormattedUTCTimestamp } from 'date-handler';
import DatabaseError from '../helpers/errors/database.error';
import { Core } from './core';
import { tableNames } from '../@types/database';
import { db } from '../helpers/client.db';
import NotFoundError from '../helpers/errors/not-found.error';

export class User extends Core<typeof tableNames.user> {
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
      if (!result) throw new NotFoundError('Could not create user');
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new DatabaseError(error);
      }
    }
  }
}
