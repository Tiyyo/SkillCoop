import { Inject } from '@nestjs/common';
import { Kysely } from 'kysely';
import { CoreAdapter } from 'src/infrastructure/kysely/adapters/core.adapter';
import { DB } from 'src/infrastructure/kysely/database.type';

export class ScoreAdapter extends CoreAdapter<'score'> {
  constructor(@Inject('dbClient') protected dbClient: Kysely<DB>) {
    super(dbClient);
  }
}
