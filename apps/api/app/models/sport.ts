import { tableNames } from '../@types/types.js';
import { Core } from './core.js';

export class Sport extends Core<typeof tableNames.sport> {
  tableName = tableNames.sport;
}
