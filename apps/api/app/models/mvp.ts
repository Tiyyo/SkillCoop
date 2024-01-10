import { tableNames } from '../@types/types.js';
import { Core } from './core.js';

export class Mvp extends Core<typeof tableNames.mvp_poll> {
  tableName = tableNames.mvp_poll;
}
