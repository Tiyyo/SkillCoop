import { TableNames } from '../@types/database';
import DatabaseError from '../helpers/errors/database.error';
import NotFoundError from '../helpers/errors/not-found.error';
import computeGbRating from '../utils/compute-gb-rating';
import { Core } from './core';
import { db } from '../helpers/client.db';
import { DB } from '../@types/database';
import { ReferenceExpression } from 'kysely';

export class SkillFoot extends Core {
  tableName: TableNames = 'skill_foot';

  constructor(client: typeof db) {
    super(client);
  }
  async find(id: number) {
    type InferredResultType = {
      avg_pace: number;
      avg_shooting: number;
      avg_dribbling: number;
      avg_passing: number;
      avg_defending: number;
    };

    type ExtendedResultType = InferredResultType & { gb_rating: number };

    const result = await this.client
      .selectFrom(this.tableName)
      .select(({ fn }) => [
        fn.avg<number>('skill_foot.pace').as('avg_pace'),
        fn.avg<number>('skill_foot.shooting').as('avg_shooting'),
        fn.avg<number>('skill_foot.dribbling').as('avg_dribbling'),
        fn.avg<number>('skill_foot.passing').as('avg_passing'),
        fn.avg<number>('skill_foot.defending').as('avg_defending'),
      ])
      .where('reviewee_id', '=', id)
      .execute();

    const extendedResult: ExtendedResultType = {
      ...result[0],
      gb_rating: computeGbRating(result[0]),
    };

    return extendedResult;
  }
  async findUniqueWithTwoClause(data: Record<string, number | string>) {
    const key = Object.keys(data);
    const value = Object.values(data);

    try {
      const result = await this.client
        .selectFrom(this.tableName)
        .selectAll()
        .where(
          key[0].toString() as unknown as ReferenceExpression<DB, TableNames>,
          '=',
          value[0],
        )
        .where(
          key[1].toString() as unknown as ReferenceExpression<DB, TableNames>,
          '=',
          value[1],
        )
        .execute();

      if (!result) throw new NotFoundError('Not found');

      return result;
    } catch (error) {
      throw new DatabaseError(error);
    }
  }
}
