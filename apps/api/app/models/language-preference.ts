import { TableNames } from '../@types/database';
import { Core } from './core';

export class LanguagePreference extends Core {
  tableName: TableNames = 'language_preference';
}
