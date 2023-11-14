import { ObjectRecordGeneric } from '../@types/types';
import DatabaseError from '../helpers/errors/database.error';
import NotFoundError from '../helpers/errors/not-found.error';
import getDateUTC from '../utils/get-date-utc';

export class Core {
  // Default value to satisfie typescript
  tableName: string = '';

  client;

  constructor(client: any) { // eslint-disable-line
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
        .where('id', '=', id)
        .execute();

      if (!result) throw new NotFoundError('Not found');

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
        query = query.where(key.toString(), '=', values[index]);
      });

      const result = await query.execute();
      if (!result) throw new NotFoundError('Not found');

      return result;
    } catch (error) {
      throw new DatabaseError(error);
    }
  }
  async create(data: ObjectRecordGeneric) {
    const today = new Date();
    const utctoday = getDateUTC(today);
    data.created_at = utctoday;
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
  async createMany(data: Array<ObjectRecordGeneric>) {
    const today = new Date();
    const utctoday = getDateUTC(today);
    data.forEach((el: ObjectRecordGeneric) => (el.created_at = utctoday));

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
    const today = new Date();
    const todayUTC = getDateUTC(today);

    data.updated_at = todayUTC;

    const result = await this.client
      .updateTable(this.tableName)
      .set({ ...data })
      .where('id', '=', id)
      .executeTakeFirst();

    return !!result.numUpdatedRows;
  }
  async delete(id: number) {
    const result = await this.client
      .deleteFrom(this.tableName)
      .where('id', '=', id)
      .executeTakeFirst();

    return !!result.numDeletedRows;
  }
  async deleteBy(data: Record<string, number | string | Date>) {
    const keys = Object.keys(data);
    const values = Object.values(data);

    try {
      let query = this.client.deleteFrom(this.tableName);

      keys.forEach((key, index) => {
        query = query.where(key.toString(), '=', values[index]);
      });

      const result = await query.executeTakeFirst();
      if (!result) throw new NotFoundError('Not found');

      return !!result.numDeletedRows;
    } catch (error) {
      throw new DatabaseError(error);
    }
  }
}
