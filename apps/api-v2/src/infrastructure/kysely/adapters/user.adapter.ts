import { Kysely, ReferenceExpression } from 'kysely';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { DB } from '../database.type';
import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from 'src/domain/entities/user.entity';
import {
  addCreatedISOStringDate,
  addUpdatedISOStringDate,
} from 'src/infrastructure/utils/add-date-object';
import { transformBoolToNumberInObject } from 'src/infrastructure/utils/bool-to-int';
import { DatabaseException } from '../database.exception';
import { CoreAdapter } from './core.adapter';
import { ApplicationException } from 'src/application/exceptions/application.exception';
import { TableNames } from 'src/config/types';

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
  async updateWithReturn(
    condition: Partial<UserEntity>,
    data: Partial<UserEntity>,
  ) {
    const dataWithIntAsBool = transformBoolToNumberInObject(data);
    const updatedUser = addUpdatedISOStringDate(dataWithIntAsBool);

    const conditionKeys = Object.keys(
      condition,
    ) as unknown as ReferenceExpression<DB, TableNames>[];
    const conditionValues = Object.values(condition);

    let promise = this.client
      .updateTable(this.tableName)
      .set(updatedUser)
      .returning(['failed_attempts', 'blocked']);
    conditionKeys.forEach((key, index) => {
      promise = promise.where(key, '=', conditionValues[index]);
    });

    try {
      const result = await promise.executeTakeFirst();
      if (!result)
        throw new ApplicationException('Could not update user', 'UserAdapter');
      return transformBoolToNumberInObject(result);
    } catch (error) {
      throw new DatabaseException(error);
    }
  }
}
