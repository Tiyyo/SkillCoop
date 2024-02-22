import { Inject, Injectable } from '@nestjs/common';
import { Kysely } from 'kysely';
import { LanguagePreferenceRepository } from 'src/domain/repositories/language-preference.repository';
import { CoreAdapter } from 'src/infrastructure/kysely/adapters/core.adapter';
import { DB } from 'src/infrastructure/kysely/database.type';

@Injectable()
export class LanguagePreferenceAdapter
  extends CoreAdapter<'language_preference'>
  implements LanguagePreferenceRepository {
  constructor(@Inject('dbClient') protected dbClient: Kysely<DB>) {
    super(dbClient);
  }
}
