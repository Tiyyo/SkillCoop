import { Inject } from '@nestjs/common';
import { Kysely, sql } from 'kysely';
import { PlagroundRepository } from 'src/domain/repositories/playground.repository';

import { CoreAdapter } from 'src/infrastructure/kysely/adapters/core.adapter';
import { DB } from 'src/infrastructure/kysely/database.type';
import { DatabaseException } from '../database.exception';

export class PlagroundAdapter
  extends CoreAdapter<'mvp_poll'>
  implements PlagroundRepository {
  constructor(@Inject('dbClient') protected dbClient: Kysely<DB>) {
    super(dbClient);
  }
  async search(query: string) {
    try {
      const result = await sql<{ id: string; name: string; city: string }>`
        SELECT 
          id, 
          name, 
          city
        FROM playground
        WHERE name LIKE ${`%${query}%`}
        OR city LIKE ${`%${query}%`}
        LIMIT 5
        `.execute(this.client);
      return result.rows;
    } catch (error) {
      if (error instanceof Error) {
        throw new DatabaseException(error);
      }
    }
  }
}
