import { tableNames } from '../@types/types';
import { Core } from './core';

export class BestStriker extends Core<typeof tableNames.best_striker_poll> {
  tableName = tableNames.best_striker_poll;
}
