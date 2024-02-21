import { Inject } from '@nestjs/common';
import { CoreAdapter } from './core.adapter';
import { Kysely } from 'kysely';
import { DB } from '../database.type';

export class ThemePreferenceAdapter extends CoreAdapter<'theme_preference'> {
  constructor(@Inject('dbClient') protected dbClient: Kysely<DB>) {
    super(dbClient);
  }
}
