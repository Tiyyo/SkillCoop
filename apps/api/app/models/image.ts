import { tableNames } from '../@types/types.js';
import { Core } from './core.js';

export class Image extends Core<typeof tableNames.image> {
  tableName = tableNames.image;
}
