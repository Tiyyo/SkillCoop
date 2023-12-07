import DatabaseError from '../helpers/errors/database.error';
import { Core } from './core';

export class Notification extends Core {
  tableName: string = 'notification';

  constructor(client: any) {
    //eslint-disable-line
    // eslint-disable-line
    super(client);
  }
  async getLast(profileId: number) {
    try {
      const result = await this.client
        .selectFrom('notification')
        .select([
          'notification.id',
          'notification.created_at',
          'notification.message',
          'notification.is_read',
          'notification.profile_id',
          'notification.type',
          'notification.subtype',
          'notification.img_url',
          'notification.event_id',
          'notification.instigator_id',
        ])
        .where('notification.profile_id', '=', profileId)
        .orderBy('notification.created_at', 'desc')
        .limit(15)
        .execute();

      return result;
    } catch (error) {
      throw new DatabaseError(error);
    }
  }
}
