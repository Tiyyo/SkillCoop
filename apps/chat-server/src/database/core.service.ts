import { Inject, Injectable } from '@nestjs/common';
import { getFormattedUTCTimestamp } from '@skillcoop/date-handler';
import { Kysely } from 'kysely';
import { DB } from './database';

@Injectable()
export class CoreModel {
  private tableName: keyof DB;

  constructor(
    @Inject('dbClient') protected dbClient: Kysely<DB>,
    tableName: keyof DB,
  ) {
    this.tableName = tableName;
  }

  async create(data: any) {
    const todayUTCString = getFormattedUTCTimestamp();
    data.created_at = todayUTCString;

    const result = await this.dbClient
      .insertInto(this.tableName)
      .values(data)
      .execute();

    return result;
  }
  async findAll() {
    const result = await this.dbClient
      .selectFrom(this.tableName)
      .selectAll()
      .execute();
    return result;
  }
}
