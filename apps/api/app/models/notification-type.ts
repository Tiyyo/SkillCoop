import { tableNames } from '../@types/types.js';
import { Core } from './core.js';

export class NotificationType extends Core<
  typeof tableNames.notification_type
> {
  tableName = tableNames.notification_type;
}
