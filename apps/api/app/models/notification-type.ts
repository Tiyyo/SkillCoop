import { tableNames } from '../@types/types';
import { Core } from './core';

export class NotificationType extends Core<
  typeof tableNames.notification_type
> {
  tableName = tableNames.notification_type;
}
