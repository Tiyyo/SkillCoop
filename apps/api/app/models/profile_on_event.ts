import { getFormattedUTCTimestamp } from 'date-handler';
import DatabaseError from '../helpers/errors/database.error';
import UserInputError from '../helpers/errors/user-input.error';
import { Core } from './core';

export class ProfileOnEvent extends Core {
  declare tableName: string;
  //@ts-ignore
  constructor(client) {
    super(client);
    this.tableName = 'profile_on_event';
  }

  async updateStatus(data: {
    event_id: number;
    profile_id: number;
    status_name: 'confirmed' | 'declined';
    updated_at: undefined | string;
  }) {
    const todayUTCString = getFormattedUTCTimestamp();
    data.updated_at = todayUTCString;

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
    const todayUTCString = getFormattedUTCTimestamp();
    data.updated_at = todayUTCString;

    const result = await this.client
      .updateTable(this.tableName)
      .set({ ...data })
      .where('profile_id', '=', profileId)
      .where('event_id', '=', eventId)
      .executeTakeFirst();

    return !!result.numUpdatedRows;
  }
}
