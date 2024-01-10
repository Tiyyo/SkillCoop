import { tableNames } from '../@types/types.js';
import computeGbRating from '../utils/compute-gb-rating.js';
import { Core } from './core.js';
import { db } from '../helpers/client.db.js';

export class SkillFoot extends Core<typeof tableNames.skill_foot> {
  declare tableName: typeof tableNames.skill_foot;

  constructor(client: typeof db) {
    super(client);
    this.tableName = tableNames.skill_foot;
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
}
