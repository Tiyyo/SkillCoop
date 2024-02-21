import { Inject } from '@nestjs/common';
import { Kysely } from 'kysely';
import { CoreAdapter } from 'src/infrastructure/kysely/adapters/core.adapter';
import { DB } from 'src/infrastructure/kysely/database.type';
import { AverageSkillNumericRating } from '../entities/skill.entity';

export class SkillAdapter
  extends CoreAdapter<'mvp_poll'>
  implements SkillRepository {
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
}

export abstract class SkillRepository {
  abstract find(profileId: string): Promise<AverageSkillNumericRating>;
}
