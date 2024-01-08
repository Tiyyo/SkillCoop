import DatabaseError from '../helpers/errors/database.error';
import NotFoundError from '../helpers/errors/not-found.error';
import { getFormattedUTCTimestamp } from '@skillcoop/date-handler';
import { db } from '../helpers/client.db';
import { ReferenceExpression, UpdateObject } from 'kysely';
import { DB } from '../@types/database';
import {
  InsertObject,
  InsertObjectOrList,
} from 'kysely/dist/cjs/parser/insert-values-parser';
import { ExtractTableAlias } from 'kysely/dist/cjs/parser/table-parser';

type OptionalCreatedAt = Partial<{ created_at: string }>;
type InsertValues<T extends keyof DB> = Omit<
  InsertObject<DB, T>,
  'created_at'
> &
  OptionalCreatedAt;

export class Core<TTableNames extends keyof DB> {
  declare tableName: TTableNames;
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
  async findOne(findObject: Partial<InsertObject<DB, TTableNames>>) {
    const keys = Object.keys(findObject) as ReferenceExpression<
      DB,
      ExtractTableAlias<DB, TTableNames>
    >[];
    const values = Object.values(findObject);
    try {
      let promise = this.client.selectFrom(this.tableName).selectAll();

      keys.forEach((key, index) => {
        promise = promise.where(key, '=', values[index]);
      });

      const result = await promise.executeTakeFirst();
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
  async createOne(data: InsertValues<TTableNames>) {
    const todayUTCString = getFormattedUTCTimestamp();
    data.created_at = todayUTCString;

    try {
      const result = await this.client
        .insertInto(this.tableName)
        .values(data as InsertObjectOrList<DB, TTableNames>)
        .execute();

      return Number(result[0].insertId);
    } catch (error) {
      if (error instanceof Error) {
        throw new DatabaseError(error);
      }
    }
  }
  async createMany(data: InsertValues<TTableNames>[]) {
    const todayUTCString = getFormattedUTCTimestamp();
    data.forEach((el) => (el.created_at = todayUTCString));

    try {
      const result = await this.client
        .insertInto(this.tableName)
        .values(data as InsertObjectOrList<DB, TTableNames>)
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
    condition: UpdateObject<
      DB,
      ExtractTableAlias<DB, TTableNames>,
      ExtractTableAlias<DB, TTableNames>
    >,
    updateObject: UpdateObject<
      DB,
      ExtractTableAlias<DB, TTableNames>,
      ExtractTableAlias<DB, TTableNames>
    >,
  ) {
    const todayUTCString = getFormattedUTCTimestamp();
    //@ts-ignore
    updateObject.updated_at = todayUTCString;

    const conditionKeys = Object.keys(condition) as ReferenceExpression<
      DB,
      ExtractTableAlias<DB, TTableNames>
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
    const keys = Object.keys(data);
    const values = Object.values(data);

    try {
      let query = this.client.deleteFrom(this.tableName);

      keys.forEach((key, index) => {
        query = query.where(
          key.toString() as unknown as ReferenceExpression<
            DB,
            ExtractTableAlias<DB, TTableNames>
          >,
          '=',
          values[index],
        );
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
