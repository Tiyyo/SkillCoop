import { tableNames } from '../@types/database';
import { Core } from './core';

export class Sport extends Core<typeof tableNames.sport> {
  tableName = tableNames.sport;
}
