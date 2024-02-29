import {
  AverageSkillNumericRating,
  AverageSkills,
  Skills,
} from '../entities/skill.entity';

export abstract class SkillsRepository {
  abstract find(profileId: string): Promise<AverageSkillNumericRating>;
  abstract getOwnEvaluation(
    profileId: string,
  ): Promise<{ user_own_evaluation: Skills }>;
  abstract getAverageEvaluation(
    profileId: string,
  ): Promise<{ avg_evaluation_received: AverageSkills }>;
}
