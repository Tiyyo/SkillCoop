import { tableNames } from '../@types/types';
import DatabaseError from '../helpers/errors/database.error';
import { Core } from './core';
import { db } from '../helpers/client.db';

export class Notification extends Core<typeof tableNames.notification> {
  constructor(client: typeof db) {
    super(client);
    this.tableName = tableNames.notification;
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
          'notification.type_name',
          'notification.subtype',
          'notification.img_url',
          'notification.event_id',
          'notification.instigator_id',
        ])
        .where('notification.profile_id', '=', profileId)
        .where('notification.is_read', '=', 0)
        .orderBy('notification.created_at', 'desc')
        .limit(15)
        .execute();

      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new DatabaseError(error);
      }
    }
  }
}
