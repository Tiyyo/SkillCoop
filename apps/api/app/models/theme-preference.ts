import { TableNames } from '../@types/database';
import { Core } from './core';

export class ThemePreference extends Core {
  tableName: TableNames = 'theme_preference';
}
