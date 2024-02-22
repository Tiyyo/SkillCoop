import { SkillsRepository } from 'src/domain/repositories/skills.repository';
import { CoreAdapter } from './core.adapter';
import { Inject } from '@nestjs/common';
import { Kysely, sql } from 'kysely';
import { DB } from '../database.type';
import {
  AverageSkillNumericRating,
  AverageSkills,
} from 'src/domain/entities/skill.entity';
import { DatabaseException } from '../database.exception';

export class SkillsAdapter
  extends CoreAdapter<'skill_foot'>
  implements SkillsRepository {
  constructor(@Inject('dbClient') protected dbClient: Kysely<DB>) {
    super(dbClient);
  }
  async find(profileId: string): Promise<AverageSkillNumericRating> {
    const result = await this.client
      .selectFrom(this.tableName)
      .select(({ fn }) => [
        fn.avg<number>('skill_foot.pace').as('avg_pace'),
        fn.avg<number>('skill_foot.shooting').as('avg_shooting'),
        fn.avg<number>('skill_foot.dribbling').as('avg_dribbling'),
        fn.avg<number>('skill_foot.passing').as('avg_passing'),
        fn.avg<number>('skill_foot.defending').as('avg_defending'),
      ])
      .where('reviewee_id', '=', profileId)
      .executeTakeFirst();
    return result;
  }
  async getOwnEvaluation(profileId: string) {
    try {
      const result = await this.dbClient
        .selectFrom('skill_foot')
        .select(['pace', 'shooting', 'passing', 'dribbling', 'defending'])
        .where('rater_id', '=', profileId)
        .where('reviewee_id', '=', profileId)
        .executeTakeFirst();
      return { user_own_evaluation: result };
    } catch (error) {
      if (error instanceof Error) {
        throw new DatabaseException(error);
      }
    }
  }
  async getAverageEvaluation(profileId: string) {
    try {
      const avgEvalsReceivedResult = await sql<AverageSkills>`
      SELECT
        COUNT (*) AS nb_eval_received,
        IFNULL(AVG(pace), 0) AS pace,
        IFNULL(AVG(dribbling), 0) AS dribbling,
        IFNULL(AVG(defending), 0) AS defending,
        IFNULL(AVG(passing), 0) AS passing,
        IFNULL(AVG(shooting), 0) AS shooting
      FROM skill_foot
      WHERE rater_id <>  ${profileId}
      AND reviewee_id =  ${profileId}
      GROUP BY reviewee_id
    `.execute(this.dbClient);
      return { avg_evaluation_received: avgEvalsReceivedResult.rows[0] };
    } catch (error) {
      if (error instanceof Error) {
        throw new DatabaseException(error);
      }
    }
  }
}
