import { tableNames } from '../@types/database';
import { Core } from './core';

export class Image extends Core<typeof tableNames.image> {
  tableName = tableNames.image;
}
