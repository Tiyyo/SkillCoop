import { Kysely } from 'kysely';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { DB } from '../database.type';
import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from 'src/domain/entities/user.entity';
import { addCreatedISOStringDate } from 'src/infrastructure/utils/add-date-object';
import { transformBoolToNumberInObject } from 'src/infrastructure/utils/bool-to-int';
import { DatabaseException } from '../database.exception';
import { CoreAdapter } from './core.adapter';

@Injectable()
export class UserAdapter extends CoreAdapter<'user'> implements UserRepository {
  constructor(@Inject('dbClient') protected dbClient: Kysely<DB>) {
    super(dbClient);
  }
  async save(data: UserEntity): Promise<{ id: string; email: string }> {
    const dataWithIntAsBool = transformBoolToNumberInObject(data);
    const dataWithCreatedAt = addCreatedISOStringDate(dataWithIntAsBool);
    try {
      const user = await this.dbClient
        .insertInto('user')
        .values(dataWithCreatedAt)
        .returning(['id', 'email'])
        .executeTakeFirst();

      return user;
    } catch (error) {
      throw new DatabaseException(error);
    }
  }
}
