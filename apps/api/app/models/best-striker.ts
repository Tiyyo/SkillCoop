import { tableNames } from '../@types/database';
import { Core } from './core';

export class BestStriker extends Core<typeof tableNames.best_striker_poll> {
  tableName = tableNames.best_striker_poll;
}
