import { Injectable } from '@nestjs/common';
import { ApplicationException } from 'src/application/exceptions/application.exception';
import {
  EvaluationSkills,
  Skills,
  UserStats,
} from 'src/domain/entities/skill.entity';
import { EventQueriesAdapter } from 'src/infrastructure/kysely/adapters/event.queries.adapter';
import { SkillsAdapter } from 'src/infrastructure/kysely/adapters/skills.adapter';
import { EvaluationService } from './evaluation.service';

type ComputedAvgSkill = {
  ownEval: number;
  receivedEval: number;
  nbReceivedEval: number;
  nbBonus: number;
};
@Injectable()
export class ComputeUserEvaluationService {
  WEIGHT_OWN_EVAL = 7;

  VALUE_BONUS = 100;

  skillNames = [
    'pace',
    'defending',
    'passing',
    'dribbling',
    'shooting',
  ] as const;

  declare userStats: UserStats;

  constructor(
    private readonly eventQueriesAdapter: EventQueriesAdapter,
    private readonly skillsAdapter: SkillsAdapter,
    private readonly evaluationService: EvaluationService,
  ) {}

  async compute(profileId: string) {
    await this.getStats(profileId);
    const avgSkills = this.constructAvgSkills();
    const gbRating = this.getRatingWithBonus(avgSkills);
    return {
      ...avgSkills,
      gb_rating: gbRating,
      profileId,
    };
  }
  async getStats(profileId: string) {
    const queries = [
      this.skillsAdapter.getOwnEvaluation(profileId),
      this.skillsAdapter.getAverageEvaluation(profileId),
      this.eventQueriesAdapter.getMvpCount(profileId),
      this.eventQueriesAdapter.getBestStrikerCount(profileId),
    ];
    const rawResult = await Promise.all(queries).catch((err) => {
      throw new ApplicationException(
        'Could not retrieve user stats' + err.message,
        'ComputeUserEvaluationService',
      );
    });
    const formatedResult = rawResult.reduce((acc, curr) => {
      return { ...acc, ...curr };
    }, {});
    this.userStats = formatedResult as UserStats;
    return formatedResult as UserStats;
  }
  private getRatingWithBonus(averageSkills: EvaluationSkills) {
    const globalRatingBeforeMvPBonus =
      this.evaluationService.average(averageSkills);
    const gbRating = this.applyMvpBonus(globalRatingBeforeMvPBonus);
    return gbRating;
  }
  applyMvpBonus(rating: number) {
    const userHaveEvaluateHimself = this.userStats.user_own_evaluation
      ? this.WEIGHT_OWN_EVAL
      : 0;
    const totalEvals =
      userHaveEvaluateHimself +
      this.userStats.avg_evaluation_received.nb_eval_received;
    const gbRatingMvpApplied =
      (rating * totalEvals + this.userStats.nb_mvp * this.VALUE_BONUS) /
      (totalEvals + this.userStats.nb_mvp);

    return Math.floor(gbRatingMvpApplied);
  }
  computeAvgSkillValue(skill: keyof Skills): number {
    const args = {
      ownEval: this.userStats.user_own_evaluation
        ? this.userStats.user_own_evaluation[`${skill}` as keyof Skills]
        : 0,
      receivedEval: this.userStats.avg_evaluation_received
        ? this.userStats.avg_evaluation_received[`${skill}` as keyof Skills]
        : 0,
      nbReceivedEval: this.userStats.avg_evaluation_received.nb_eval_received,
      nbBonus: 0,
    };
    if (skill === 'shooting') {
      args.nbBonus = this.userStats.nb_best_striker;
    }
    return Math.floor(this.getNumerator(args) / this.getDenominator(args));
  }
  private constructAvgSkills() {
    return this.skillNames.reduce<Skills>((acc, currSkillName) => {
      const skillName = `avg_${currSkillName}`;
      return {
        ...acc,
        [skillName]: this.computeAvgSkillValue(currSkillName),
      };
    }, {} as Skills) as unknown as EvaluationSkills;
  }
  getNumerator(args: ComputedAvgSkill) {
    return (
      this.productNumerator(args.ownEval, this.WEIGHT_OWN_EVAL) +
      this.productNumerator(args.receivedEval, args.nbReceivedEval) +
      this.productNumerator(this.VALUE_BONUS, args.nbBonus)
    );
  }
  productNumerator(value: number | undefined, coef: number = 1) {
    if (!value || !coef) return 0;
    return value * coef;
  }
  getDenominator(args: ComputedAvgSkill) {
    const ownEvalDenominator = args.ownEval ? this.WEIGHT_OWN_EVAL : 0;
    const receivedDenominator = args.receivedEval ? args.nbReceivedEval : 0;
    return ownEvalDenominator + receivedDenominator + args.nbBonus;
  }
}
