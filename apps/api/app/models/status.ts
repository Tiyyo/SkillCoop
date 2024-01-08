import { tableNames } from '../@types/types';
import { Core } from './core';

export class Status extends Core<typeof tableNames.status> {
  tableName = tableNames.status;
}
