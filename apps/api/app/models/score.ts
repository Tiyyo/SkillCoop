import { tableNames } from '../@types/database';
import { Core } from './core';

export class Score extends Core<typeof tableNames.score> {
  tableName = tableNames.score;
}
