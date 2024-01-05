import { tableNames } from '../@types/database';
import { Core } from './core';

export class NotificationType extends Core<
  typeof tableNames.notification_type
> {
  tableName = tableNames.notification_type;
}
