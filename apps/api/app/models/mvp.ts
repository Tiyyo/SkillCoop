import { tableNames } from '../@types/database';
import { Core } from './core';

export class Mvp extends Core<typeof tableNames.mvp_poll> {
  tableName = tableNames.mvp_poll;
}
