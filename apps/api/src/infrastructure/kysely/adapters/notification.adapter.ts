import { Inject, Injectable } from '@nestjs/common';
import { Kysely } from 'kysely';
import { NotificationRepository } from 'src/domain/repositories/notification.repository';
import { CoreAdapter } from 'src/infrastructure/kysely/adapters/core.adapter';
import { DB } from 'src/infrastructure/kysely/database.type';
import { DatabaseException } from '../database.exception';

@Injectable()
export class NotificationAdapter
  extends CoreAdapter<'notification'>
  implements NotificationRepository
{
  constructor(@Inject('dbClient') protected dbClient: Kysely<DB>) {
    super(dbClient);
    this.tableName = 'notification';
  }
  async getLast(profileId: string) {
    try {
      const result = await this.client
        .selectFrom('notification')
        .select([
          'notification.id',
          'notification.created_at',
          'notification.message',
          'notification.is_read',
          'notification.profile_id',
          'notification.type_name as type',
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
        throw new DatabaseException(error);
      }
    }
  }
}
