import { Inject } from '@nestjs/common';
import { Kysely } from 'kysely';
import { NotificationTypeRepository } from 'src/domain/repositories/notification-type.repository';
import { CoreAdapter } from 'src/infrastructure/kysely/adapters/core.adapter';
import { DB } from 'src/infrastructure/kysely/database.type';

export class NotificationTypeAdapter
  extends CoreAdapter<'notification_type'>
  implements NotificationTypeRepository {
  constructor(@Inject('dbClient') protected dbClient: Kysely<DB>) {
    super(dbClient);
  }
}
