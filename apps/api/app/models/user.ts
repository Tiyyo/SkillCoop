// import { DBClientType } from '../@types/types.database';
import { getFormattedUTCTimestamp } from 'date-handler';
import DatabaseError from '../helpers/errors/database.error';
import { Core } from './core';
import { DB, TableNames } from '../@types/database';
import { db } from '../helpers/client.db';
import { SelectExpression } from 'kysely';

export class User extends Core {
  tableName: TableNames = 'user';

  constructor(client: typeof db) {
    super(client);
  }
  // issue with the inferred type of the return value
  // email is inferred as string | number instead of string
  async createUser(data: {
    password: string;
    email: string;
    created_at: string;
  }): Promise<{ id: number; email: string }> {
    const todayUTCString = getFormattedUTCTimestamp();
    data.created_at = todayUTCString;

    try {
      const [result] = await this.client
        .insertInto(this.tableName)
        .values(data)
        .returning(['id', 'email'])
        .execute();
      //@ts-ignore
      return result;
    } catch (error) {
      throw new DatabaseError(error);
    }
  }
}
