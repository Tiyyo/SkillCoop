import { tableNames } from '../@types/database';
import { Core } from './core';

export class Status extends Core<typeof tableNames.status> {
  tableName = tableNames.status;
}
