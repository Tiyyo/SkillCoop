import { getFormattedUTCTimestamp } from '@skillcoop/date-handler';
import { Kysely, ReferenceExpression } from 'kysely';
import { InsertObject } from 'kysely';
import { DB } from '../database.type.js';
import { DatabaseException } from '../database.exception.js';
import { Inject, NotFoundException } from '@nestjs/common';
import {
  FindObjectDB,
  InsertObjectDB,
  ReturnTableType,
  TableNames,
  UpdateObjectDB,
} from 'src/config/types.js';
import { CoreRepository } from 'src/domain/repositories/core.repository';
import {
  addCreatedISOStringDate,
  addUpdatedISOStringDate,
} from 'src/infrastructure/utils/add-date-object';
import { transformBoolToNumberInObject } from 'src/infrastructure/utils/bool-to-int';

export class CoreAdapter<Table extends keyof DB> implements CoreRepository {
  declare tableName: TableNames;

  constructor(@Inject('dbClient') protected client: Kysely<DB>) {
    this.client = client;
  }
  async findAll() {
    try {
      const result = await this.client
        .selectFrom(this.tableName)
        .selectAll()
        .execute();
      if (!result || result.length === 0)
        throw new NotFoundException('Not found');
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new DatabaseException(error);
      }
    }
  }
  async findOne(
    findObject: FindObjectDB<Table>,
  ): Promise<ReturnTableType<Table> | undefined> {
    const keys = Object.keys(findObject) as ReferenceExpression<
      DB,
      TableNames
    >[];
    const values = Object.values(findObject);

    try {
      let promise = this.client.selectFrom(this.tableName).selectAll();
      keys.forEach((key, index) => {
        promise = promise.where(key, '=', values[index]);
      });

      const result =
        (await promise.executeTakeFirst()) as unknown as ReturnTableType<Table>;

      if (!result) throw new NotFoundException('Not found');

      return result;
    } catch (error) {
      if (error instanceof NotFoundException) {
        return undefined;
      }
      if (error instanceof Error) {
        throw new DatabaseException(error);
      }
    }
  }
  async createOne(data: InsertObjectDB<Table>) {
    const dataWithCreatedAt = addCreatedISOStringDate(data);
    try {
      const result = await this.client
        .insertInto(this.tableName)
        .values(dataWithCreatedAt as InsertObject<DB, TableNames>)
        .execute();

      return Number(result[0].insertId);
    } catch (error) {
      if (error instanceof Error) {
        throw new DatabaseException(error);
      }
    }
  }
  async createMany(data: InsertObjectDB<Table>[]) {
    const todayUTCString = getFormattedUTCTimestamp();
    data.forEach((el) => (el.created_at = todayUTCString));

    try {
      const result = await this.client
        .insertInto(this.tableName)
        .values(data as InsertObject<DB, TableNames>[])
        .execute();

      return !!result[0].numInsertedOrUpdatedRows;
    } catch (error) {
      if (error instanceof Error) {
        throw new DatabaseException(error);
      }
    }
  }
  /**
   *
   * @param condition  An objetc with the form of {key: value} where
     key is a column name and value is the value to compare
   * @param updateObject An object with the form of {key: value} where

   * @returns
   */
  async updateOne(
    condition: UpdateObjectDB<Table>,
    updateObject: UpdateObjectDB<Table>,
  ) {
    const dataWithBoolean = transformBoolToNumberInObject(updateObject);
    const dataWithUpdatedAt = addUpdatedISOStringDate(dataWithBoolean);

    const conditionKeys = Object.keys(condition) as ReferenceExpression<
      DB,
      TableNames
    >[];
    const conditionValues = Object.values(condition);

    let promise = this.client
      .updateTable(this.tableName)
      .set(dataWithUpdatedAt);
    conditionKeys.forEach((key, index) => {
      promise = promise.where(key, '=', conditionValues[index]);
    });
    const result = await promise.executeTakeFirst();

    return !!Number(result.numUpdatedRows);
  }
  async deleteOne(data: Record<string, number | string | Date>) {
    const keys = Object.keys(data) as ReferenceExpression<DB, TableNames>[];
    const values = Object.values(data);

    try {
      let query = this.client.deleteFrom(this.tableName);

      keys.forEach((key, index) => {
        query = query.where(key, '=', values[index]);
      });
      const result = await query.executeTakeFirst();

      return !!Number(result.numDeletedRows);
    } catch (error) {
      if (error instanceof Error) {
        throw new DatabaseException(error);
      }
    }
  }
}
