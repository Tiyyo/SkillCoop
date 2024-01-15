import { Inject, Injectable } from '@nestjs/common';
import { CoreModel } from './core.service';
import { Kysely } from 'kysely';
import { DB } from './database';

@Injectable()
export class UserModel extends CoreModel {
  constructor(@Inject('dbClient') dbClient: Kysely<DB>) {
    super(dbClient, 'user');
  }
}
