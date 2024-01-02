import { TableNames } from '../@types/database';
import { Core } from './core';

export class NotificationType extends Core {
  tableName: TableNames = 'notification_type';
}
