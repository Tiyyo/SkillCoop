import { DBClientType } from '../@types/types.database';
import DatabaseError from '../helpers/errors/database.error';
import UserInputError from '../helpers/errors/user-input.error';
import getDateUTC from '../utils/get-date-utc';
import { Core } from './core';

export class ProfileOnEvent extends Core {
  tableName: string = 'profile_on_event';

  constructor(client: DBClientType) {
    super(client);
  }

  async updateStatus(data: {
    event_id: number;
    profile_id: number;
    status_name: 'confirmed' | 'declined';
    updated_at: undefined | string;
  }) {
    const today = new Date();
    const utctoday = getDateUTC(today);
    data.updated_at = utctoday;

    //TODO check if a pending invitation exist
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
      throw new DatabaseError(error);
    }
  }
  async updateUnionFk(
    profileId: number,
    eventId: number,
    data: Record<string, string | number>,
  ) {
    const today = new Date();
    const todayUTC = getDateUTC(today);

    data.updated_at = todayUTC;

    const result = await this.client
      .updateTable(this.tableName)
      .set({ ...data })
      .where('profile_id', '=', profileId)
      .where('event_id', '=', eventId)
      .executeTakeFirst();

    return !!result.numUpdatedRows;
  }
}
