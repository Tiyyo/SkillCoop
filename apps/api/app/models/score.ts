import { tableNames } from '../@types/types';
import { Core } from './core';

export class Score extends Core<typeof tableNames.score> {
  tableName = tableNames.score;
}
