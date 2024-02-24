import { Inject, Injectable } from '@nestjs/common';
import { CoreAdapter } from './core.adapter';
import { Kysely } from 'kysely';
import { DB } from '../database.type';
import { ThemePreferenceRepository } from 'src/domain/repositories/theme-preference.repository';

@Injectable()
export class ThemePreferenceAdapter
  extends CoreAdapter<'theme_preference'>
  implements ThemePreferenceRepository {
  constructor(@Inject('dbClient') protected dbClient: Kysely<DB>) {
    super(dbClient);
    this.tableName = 'theme_preference';
  }
}
