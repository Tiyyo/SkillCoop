import { Injectable } from '@nestjs/common';
import { ComputeUserEvaluationService } from 'src/domain/services/skills/compute-user-evaluation.service';
import { ProfileAdapter } from 'src/infrastructure/kysely/adapters/profile.adapter';

@Injectable()
export class GetUserSkillsUsecases {
  constructor(
    private readonly computeUserEvaluationService: ComputeUserEvaluationService,
    private readonly profileAdapter: ProfileAdapter,
  ) { }
  async getProfileEvaluation(profileId: string) {
    const userEvaluation =
      await this.computeUserEvaluationService.compute(profileId);

    await this.profileAdapter.updateOne(
      { profile_id: profileId },
      { last_evaluation: userEvaluation.gb_rating },
    );
    return userEvaluation;
  }
}
