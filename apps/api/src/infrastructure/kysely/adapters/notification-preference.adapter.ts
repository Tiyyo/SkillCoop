import { Inject, Injectable } from '@nestjs/common';
import { CoreAdapter } from './core.adapter';
import { Kysely } from 'kysely';
import { DB } from '../database.type';
import { NotificationPreferenceRepository } from 'src/domain/repositories/notification-preference.repository';
import { DatabaseException } from '../database.exception';
import { transformNumberToBooleanInObject } from 'src/infrastructure/utils/bool-to-int';

@Injectable()
export class NotificationPreferenceAdapter
  extends CoreAdapter<'notification_preference'>
  implements NotificationPreferenceRepository
{
  constructor(@Inject('dbClient') protected dbClient: Kysely<DB>) {
    super(dbClient);
    this.tableName = 'notification_preference';
  }
  async find(userId: string, type?: string) {
    try {
      let query = this.dbClient
        .selectFrom(this.tableName)
        .select(['type_name', 'email', 'push', 'website'])
        .where('user_id', '=', userId);
      if (type) {
        query = query.where('type_name', '=', type);
      }
      const result = await query.execute();

      const parsedResult = result.map((row) =>
        transformNumberToBooleanInObject(row),
      );

      return parsedResult;
    } catch (error) {
      if (error instanceof Error) {
        throw new DatabaseException(error);
      }
    }
  }
}
