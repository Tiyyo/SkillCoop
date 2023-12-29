// import { DBClientType } from '../@types/types.database';
import { getFormattedUTCTimestamp } from 'date-handler';
import DatabaseError from '../helpers/errors/database.error';
import { Core } from './core';

export class User extends Core {
  tableName: string = 'user';
  //@ts-ignore
  constructor(client) {
    super(client);
  }
  async createUser(data: {
    password: string;
    email: string;
    created_at?: string;
  }): Promise<{ id: number; email: string }> {
    const todayUTCString = getFormattedUTCTimestamp();
    data.created_at = todayUTCString;
    try {
      const result = await this.client
        .insertInto(this.tableName)
        .values(data)
        .returning(['id', 'email'])
        .execute();

      return result[0];
    } catch (error) {
      throw new DatabaseError(error);
    }
  }
}
