import { getFormattedUTCTimestamp } from '@skillcoop/date-handler';
import DatabaseError from '../helpers/errors/database.error';
import UserInputError from '../helpers/errors/user-input.error';
import { Core } from './core';
import { DB, tableNames } from '../@types/database';
import { db } from '../helpers/client.db';
import NotFoundError from '../helpers/errors/not-found.error';
import { InsertObject, ReferenceExpression } from 'kysely';
import { ExtractTableAlias } from 'kysely/dist/cjs/parser/table-parser';

export class ProfileOnEvent extends Core<typeof tableNames.profile_on_event> {
  constructor(client: typeof db) {
    super(client);
    this.tableName = tableNames.profile_on_event;
  }

  async updateStatus(data: {
    event_id: number;
    profile_id: number;
    status_name: 'confirmed' | 'declined';
    updated_at: undefined | string;
  }) {
    const todayUTCString = getFormattedUTCTimestamp();
    data.updated_at = todayUTCString;

    //check if a pending invitation exist
    try {
      const participantExistence = await this.client
        .selectFrom(this.tableName)
        .selectAll()
        .where('event_id', '=', data.event_id)
        .where('profile_id', '=', data.profile_id)
        .executeTakeFirst();

      const isExist = !!participantExistence;

      if (!isExist) throw new UserInputError('User have not been invited yet');

      const result = await this.client
        .updateTable(this.tableName)
        .set({ ...data })
        .where('event_id', '=', data.event_id)
        .where('profile_id', '=', data.profile_id)
        .executeTakeFirst();

      return !!result.numChangedRows;
    } catch (error) {
      if (error instanceof UserInputError) throw error;
      if (error instanceof Error) {
        throw new DatabaseError(error);
      }
    }
  }
  async find(findObject: Partial<InsertObject<DB, typeof this.tableName>>) {
    const keys = Object.keys(findObject) as ReferenceExpression<
      DB,
      ExtractTableAlias<DB, typeof this.tableName>
    >[];
    const values = Object.values(findObject);
    try {
      let promise = this.client.selectFrom(this.tableName).selectAll();

      keys.forEach((key, index) => {
        promise = promise.where(key, '=', values[index]);
      });

      const result = await promise.execute();
      if (!result || result.length === 0) throw new NotFoundError('Not found');
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new DatabaseError(error);
      }
    }
  }
}
