import { tableNames } from '../@types/types.js';
import { Core } from './core.js';

export class Score extends Core<typeof tableNames.score> {
  tableName = tableNames.score;
}
