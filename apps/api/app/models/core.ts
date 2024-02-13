import { getFormattedUTCTimestamp } from '@skillcoop/date-handler';
import { ReferenceExpression } from 'kysely';
import { DB } from '../@types/database.js';
import { InsertObject } from 'kysely';
import {
  FindObjectDB,
  InsertObjectDB,
  ReturnTableType,
  TableNames,
  UpdateObjectDB,
} from '../@types/types.js';
import { db } from '../helpers/client.db.js';
import NotFoundError from '../helpers/errors/not-found.error.js';
import DatabaseError from '../helpers/errors/database.error.js';

export class Core<Table extends keyof DB> {
  declare tableName: TableNames;
  declare client: typeof db;

  constructor(client: typeof db) {
    this.client = client;
  }
  async findAll() {
    try {
      const result = await this.client
        .selectFrom(this.tableName)
        .selectAll()
        .execute();
      if (!result || result.length === 0) throw new NotFoundError('Not found');
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new DatabaseError(error);
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

      if (!result) throw new NotFoundError('Not found');

      return result;
    } catch (error) {
      if (error instanceof NotFoundError) {
        return undefined;
      }
      if (error instanceof Error) {
        throw new DatabaseError(error);
      }
    }
  }
  async createOne(data: InsertObjectDB<Table>) {
    const todayUTCString = getFormattedUTCTimestamp();
    data.created_at = todayUTCString;
    try {
      const result = await this.client
        .insertInto(this.tableName)
        .values(data as InsertObject<DB, TableNames>)
        .execute();

      return Number(result[0].insertId);
    } catch (error) {
      console.log('error', error);
      if (error instanceof Error) {
        throw new DatabaseError(error);
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
        throw new DatabaseError(error);
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
    const todayUTCString = getFormattedUTCTimestamp();
    updateObject.updated_at = todayUTCString;

    const conditionKeys = Object.keys(condition) as ReferenceExpression<
      DB,
      TableNames
    >[];
    const conditionValues = Object.values(condition);

    let promise = this.client.updateTable(this.tableName).set(updateObject);
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
        throw new DatabaseError(error);
      }
    }
  }
}
