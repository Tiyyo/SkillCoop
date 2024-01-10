import { tableNames } from '../@types/types.js';
import { Core } from './core.js';

export class BestStriker extends Core<typeof tableNames.best_striker_poll> {
  tableName = tableNames.best_striker_poll;
}
