import { TableNames } from '../@types/database';
import { Core } from './core';

export class Status extends Core {
  tableName: TableNames = 'status';
}
