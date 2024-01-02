import { TableNames } from '../@types/database';
import { Core } from './core';

export class NotificationPreference extends Core {
  tableName: TableNames = 'notification_preference';
}
