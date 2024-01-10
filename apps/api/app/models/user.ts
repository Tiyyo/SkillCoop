// import { DBClientType } from '../@types/types.database';
import { getFormattedUTCTimestamp } from '@skillcoop/date-handler';
import DatabaseError from '../helpers/errors/database.error.js';
import { Core } from './core.js';
import { tableNames } from '../@types/types.js';
import { db } from '../helpers/client.db.js';
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
      if (!result) throw new NotFoundError('Could not create user');
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new DatabaseError(error);
      }
    }
  }
}
