import { tableNames } from '../@types/types';
import { Core } from './core';

export class Sport extends Core<typeof tableNames.sport> {
  tableName = tableNames.sport;
}
