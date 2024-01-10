import { tableNames } from '../@types/types.js';
import { Core } from './core.js';

export class Status extends Core<typeof tableNames.status> {
  tableName = tableNames.status;
}
