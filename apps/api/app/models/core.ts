import { ObjectRecordGeneric } from '../@types/types';
import DatabaseError from '../helpers/errors/database.error';
import NotFoundError from '../helpers/errors/not-found.error';
import { getFormattedUTCTimestamp } from 'date-handler';
import { db } from '../helpers/client.db';
import { TableNames } from '../@types/database';
import { ReferenceExpression } from 'kysely';
import { DB } from '../@types/database';
import {
  InsertObject,
  InsertObjectOrList,
} from 'kysely/dist/cjs/parser/insert-values-parser';
import { ExtractTableAlias } from 'kysely/dist/cjs/parser/table-parser';

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
      if (!result) throw new NotFoundError('Not found');

      return result;
    } catch (error) {
      throw new DatabaseError(error);
    }
  }
  async findByPk(id: number) {
    try {
      const result = await this.client
        .selectFrom(this.tableName)
        .selectAll()
        .where(`id`, '=', id)
        .execute();

      if (!result || result.length === 0) throw new NotFoundError('Not found');

      return result[0];
    } catch (error) {
      throw new DatabaseError(error);
    }
  }
  // accept several where clause with the form of {key: value}
  async findBy(data: Record<string, number | string | Date>) {
    const keys = Object.keys(data);
    const values = Object.values(data);

    try {
      let query = this.client.selectFrom(this.tableName).selectAll();

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

      const result = await query.execute();
      if (!result) throw new NotFoundError('Not found');

      return result;
    } catch (error) {
      throw new DatabaseError(error);
    }
  }
  async create(data: InsertObjectOrList<DB, typeof this.tableName>) {
    const todayUTCString = getFormattedUTCTimestamp();
    data.created_at = todayUTCString;

    try {
      const result = await this.client
        .insertInto(this.tableName)
        .values(data)
        .execute();

      return Number(result[0].insertId);
    } catch (error) {
      throw new DatabaseError(error);
    }
  }
  async createMany(data: InsertObject<DB, TableNames>[]) {
    const todayUTCString = getFormattedUTCTimestamp();
    data.forEach((el) => (el.created_at = todayUTCString));

    try {
      const result = await this.client
        .insertInto(this.tableName)
        .values(data)
        .execute();

      return !!result[0].numInsertedOrUpdatedRows;
    } catch (error) {
      throw new DatabaseError(error);
    }
  }
  async update(id: number, data: ObjectRecordGeneric) {
    const todayUTCString = getFormattedUTCTimestamp();
    data.updated_at = todayUTCString;

    const result = await this.client
      .updateTable(this.tableName)
      .set({ ...data })
      .where('id', '=', id)
      .executeTakeFirst();

    return !!Number(result.numUpdatedRows);
  }
  async delete(id: number) {
    const result = await this.client
      .deleteFrom(this.tableName)
      .where('id', '=', id)
      .executeTakeFirst();

    return !!Number(result.numDeletedRows);
  }
  async deleteBy(data: Record<string, number | string | Date>) {
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
      if (!result) throw new NotFoundError('Not found');

      return !!Number(result.numDeletedRows);
    } catch (error) {
      throw new DatabaseError(error);
    }
  }
}
