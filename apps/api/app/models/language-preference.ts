import { TableNames } from '../@types/database';
import { Core } from './core';
import { db } from '../helpers/client.db';
import { getFormattedUTCTimestamp } from 'date-handler';
import DatabaseError from '../helpers/errors/database.error';

export class LanguagePreference extends Core {
  tableName: TableNames;

  constructor(client: typeof db) {
    super(client);
    this.tableName = 'language_preference';
  }
  async updatePreference(userId: number, languageSymbol: string) {
    const todayUTCString = getFormattedUTCTimestamp();
    const updatePayload = {
      name: languageSymbol,
      updated_at: todayUTCString,
    };

    try {
      const [result] = await this.client
        .updateTable(this.tableName)
        .set(updatePayload)
        .where('user_id', '=', userId)
        .execute();

      return !!Number(result.numUpdatedRows);
    } catch (error) {
      throw new DatabaseError(error);
    }
  }
}
