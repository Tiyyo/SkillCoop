import { DBClientType } from '../@types/types.database';
import DatabaseError from '../helpers/errors/database.error';
import NotFoundError from '../helpers/errors/not-found.error';
import computeGbRating from '../utils/compute-gb-rating';
import { Core } from './core';

export class SkillFoot extends Core {
  tableName: string = 'skill_foot'

  constructor(client: DBClientType) {
    super(client);
  }
  async find(id: number) {
    const result = await this.client
      .selectFrom(this.tableName)
      //@ts-ignore
      .select(({ fn }) => [
        fn.avg('skill_foot.pace').as('avg_pace'),
        fn.avg('skill_foot.shooting').as('avg_shooting'),
        fn.avg('skill_foot.dribbling').as('avg_dribbling'),
        fn.avg('skill_foot.passing').as('avg_passing'),
        fn.avg('skill_foot.defending').as('avg_defending')
      ])
      .where("reviewee_id", "=", id)
      .execute();

    result[0].gb_rating = computeGbRating(result[0]);

    return result[0];
  }
  async findUniqueWithTwoClause(data: Record<string, number | string>) {

    const key = Object.keys(data);
    const value = Object.values(data);

    try {

      const result = await this.client
        .selectFrom(this.tableName)
        .selectAll()
        .where(key[0].toString(), "=", value[0])
        .where(key[1].toString(), "=", value[1])
        .execute();

      if (!result) throw new NotFoundError('Not found');

      return result;
    } catch (error) {
      throw new DatabaseError(error);
    }
  }
}

