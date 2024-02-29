import { Inject, Injectable } from '@nestjs/common';
import { Kysely } from 'kysely';
import { MvpRepository } from 'src/domain/repositories/mvp.repository';
import { CoreAdapter } from 'src/infrastructure/kysely/adapters/core.adapter';
import { DB } from 'src/infrastructure/kysely/database.type';

@Injectable()
export class MvpAdapter
  extends CoreAdapter<'mvp_poll'>
  implements MvpRepository
{
  constructor(@Inject('dbClient') protected dbClient: Kysely<DB>) {
    super(dbClient);
    this.tableName = 'mvp_poll';
  }
}
