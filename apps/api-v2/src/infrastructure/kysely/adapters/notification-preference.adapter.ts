import { Inject, Injectable } from '@nestjs/common';
import { CoreAdapter } from './core.adapter';
import { Kysely } from 'kysely';
import { DB } from '../database.type';
import { NotificationPreferenceRepository } from 'src/domain/repositories/notification-preference.repository';

@Injectable()
export class NotificationPreferenceAdapter
  extends CoreAdapter<'notification_preference'>
  implements NotificationPreferenceRepository {
  constructor(@Inject('dbClient') protected dbClient: Kysely<DB>) {
    super(dbClient);
    this.tableName = 'notification_preference';
  }
}
