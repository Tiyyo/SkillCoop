import { tableNames } from '../@types/types.js';
import { Core } from './core.js';
import { getFormattedUTCTimestamp } from '@skillcoop/date-handler';
import { db } from '../helpers/client.db.js';
import DatabaseError from '../helpers/errors/database.error.js';

export class ThemePreference extends Core<typeof tableNames.theme_preference> {
  declare tableName: typeof tableNames.theme_preference;

  constructor(client: typeof db) {
    super(client);
    this.tableName = tableNames.theme_preference;
  }

  async updatePreference(userId: number, themeName: string) {
    const todayUTCString = getFormattedUTCTimestamp();
    const updatePayload = {
      name: themeName,
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
