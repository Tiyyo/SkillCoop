import { Inject } from '@nestjs/common';
import { Kysely } from 'kysely';
import { CoreAdapter } from 'src/infrastructure/kysely/adapters/core.adapter';
import { DB } from 'src/infrastructure/kysely/database.type';

export class ThemePreferenceAdapter extends CoreAdapter<'theme_preference'> {
  constructor(@Inject('dbClient') protected dbClient: Kysely<DB>) {
    super(dbClient);
  }
}
