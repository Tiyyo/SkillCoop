import { Inject, Injectable } from '@nestjs/common';
import { Kysely } from 'kysely';
import { BestStrikerRepository } from 'src/domain/repositories/best-striker.repository';
import { CoreAdapter } from 'src/infrastructure/kysely/adapters/core.adapter';
import { DB } from 'src/infrastructure/kysely/database.type';

@Injectable()
export class BestStrikerAdapter
  extends CoreAdapter<'best_striker_poll'>
  implements BestStrikerRepository {
  constructor(@Inject('dbClient') protected dbClient: Kysely<DB>) {
    super(dbClient);
    this.tableName = 'best_striker_poll';
  }
}
