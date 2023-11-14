// import { DBClientType } from '../@types/types.database';
import DatabaseError from '../helpers/errors/database.error';
import getDateUTC from '../utils/get-date-utc';
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
    const today = new Date();
    const utctoday = getDateUTC(today);
    data.created_at = utctoday;
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
