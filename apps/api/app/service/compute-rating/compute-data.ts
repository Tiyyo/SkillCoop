import { AvgSkill, Score, Skills } from '@skillcoop/types';
import { UserEvaluationsBonus } from './sql-methods';
import computeGbRating from '../../utils/compute-gb-rating';

type ArgsSkillCompute = {
  ownEval: number;
  receivedEval: number;
  nbReceivedEval: number;
  nbBonus: number;
};

export class ComputeRating {
  WEIGHT_OWN_EVAL = 7;
  VALUE_BONUS = 100;
  skillNames = ['pace', 'defending', 'passing', 'dribbling', 'shooting'];

  ownEval?: Skills;
  receivedEval?: AvgSkill;
  nbEvalReceived: number;
  nb_mvp: number;
  nb_best_striker: number;
  profileId: number;

  constructor(
    userEvaluationsAndBonus: UserEvaluationsBonus,
    profileId: number,
  ) {
    this.profileId = profileId;
    this.ownEval = userEvaluationsAndBonus.user_own_evaluation;
    this.receivedEval = userEvaluationsAndBonus.avg_evaluation_received;
    this.nbEvalReceived = this.receivedEval
      ? this.receivedEval.nb_eval_received
      : 0;
    this.nb_mvp = userEvaluationsAndBonus.nb_mvp;
    this.nb_best_striker = userEvaluationsAndBonus.nb_best_striker;
  }
  compute() {
    const avgSkills = this.constructAvgSkills();
    const gbRating = this.getRatingWithBonus(avgSkills);
    return {
      ...avgSkills,
      gb_rating: gbRating,
      profileId: this.profileId,
    };
  }
  getRatingWithBonus(avgSkills: Score) {
    const globalRatingBeforeMvPBonus = computeGbRating(avgSkills);
    const gbRating = this.applyMvpBonus(globalRatingBeforeMvPBonus);
    return gbRating;
  }
  applyMvpBonus(rating: number) {
    const userHaveEvaluateHimself = this.ownEval ? this.WEIGHT_OWN_EVAL : 0;
    const totalEvals = userHaveEvaluateHimself + this.nbEvalReceived;
    const gbRatingMvpApplied =
      (rating * totalEvals + this.nb_mvp * this.VALUE_BONUS) /
      (totalEvals + this.nb_mvp);

    return Math.floor(gbRatingMvpApplied);
  }
  computeAvgSkillValue(skill: Partial<Skills> | string) {
    const args = {
      ownEval: this.ownEval ? this.ownEval[`${skill}` as keyof Skills] : 0,
      receivedEval: this.receivedEval
        ? this.receivedEval[`${skill}` as keyof Skills]
        : 0,
      nbReceivedEval: this.nbEvalReceived,
      nbBonus: 0,
    };
    if (skill === 'shooting') {
      args.nbBonus = this.nb_best_striker;
    }
    return Math.floor(this.getNumerator(args) / this.getDenominator(args));
  }
  constructAvgSkills(): Score {
    return this.skillNames.reduce((acc, currSkillName) => {
      const skillName = `avg_${currSkillName}`;
      return {
        ...acc,
        [skillName]: this.computeAvgSkillValue(currSkillName),
      };
    }, {}) as Score;
  }
  getNumerator(args: ArgsSkillCompute) {
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
  getDenominator(args: ArgsSkillCompute) {
    const ownEvalDenominator = args.ownEval ? this.WEIGHT_OWN_EVAL : 0;
    const receivedDenominator = args.receivedEval ? args.nbReceivedEval : 0;
    return ownEvalDenominator + receivedDenominator + args.nbBonus;
  }
}
