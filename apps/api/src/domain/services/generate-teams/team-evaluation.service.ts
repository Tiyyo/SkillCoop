import { Injectable } from '@nestjs/common';
import { ComputeUserEvaluationService } from '../skills/compute-user-evaluation.service';
import {
  EvaluationSkills,
  TeamMemberEvaluation,
} from 'src/domain/entities/skill.entity';

@Injectable()
export class TeamEvaluationComputeService {
  constructor(
    private readonly computeUserEvaluationService: ComputeUserEvaluationService,
  ) {}
  async compute(ids: string[]) {
    const participantEvals = await this.getUsersEvals(ids);
    const evals = await this.ensureAllParticipantsGotEvaluated(
      participantEvals,
      ids,
    );
    return this.keepIdsAndGbRating(evals);
  }
  private async getUsersEvals(ids: string[]) {
    const participantEvals = await Promise.allSettled(
      ids.map((id) => this.computeUserEvaluationService.compute(id)),
    )
      .then((res) => {
        return res;
      })
      .catch((err) => console.log('ERROR :', err));
    return participantEvals;
  }
  private async ensureAllParticipantsGotEvaluated(
    promiseSettledResultEval: PromiseSettledResult<EvaluationSkills>[] | void,
    ids: string[],
  ) {
    if (!promiseSettledResultEval) return;
    const evals = promiseSettledResultEval.map((evaluation, index: number) => {
      if (evaluation.status !== 'fulfilled') {
        return {
          avg_pace: 50,
          avg_defending: 50,
          avg_passing: 50,
          avg_dribbling: 50,
          avg_shooting: 50,
          gb_rating: 50,
          profile_id: ids[index],
        };
      } else {
        return evaluation.value;
      }
    });
    return evals as TeamMemberEvaluation[];
  }
  private keepIdsAndGbRating(evals: TeamMemberEvaluation[]) {
    if (!evals) return;
    const ids = [];
    const values = [];
    evals.forEach((skill) => {
      ids.push(skill.profile_id);
      values.push(skill.gb_rating);
    });
    return { ids, values };
  }
}
