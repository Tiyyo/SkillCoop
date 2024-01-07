import { tableNames } from '../@types/types';
import { Core } from './core';

export class Image extends Core<typeof tableNames.image> {
  tableName = tableNames.image;
}
