import { tableNames } from '../@types/types';
import { Core } from './core';
import { db } from '../helpers/client.db';
import { getFormattedUTCTimestamp } from 'date-handler';
import DatabaseError from '../helpers/errors/database.error';

export class LanguagePreference extends Core<
  typeof tableNames.language_preference
> {
  constructor(client: typeof db) {
    super(client);
    this.tableName = tableNames.language_preference;
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
      if (error instanceof Error) {
        throw new DatabaseError(error);
      }
    }
  }
}
