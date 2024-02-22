import { SkillRating } from '../value-objects/skill-rating.vo';

export type Skills = {
  pace: number;
  shooting: number;
  passing: number;
  dribbling: number;
  defending: number;
};

export type AverageSkills = Skills & {
  nb_eval_received: number;
};

export type EvaluationSkills = {
  avg_pace: number;
  avg_shooting: number;
  avg_passing: number;
  avg_dribbling: number;
  avg_defending: number;
};

export type AverageSkill =
  | 'avg_pace'
  | 'avg_defending'
  | 'avg_shooting'
  | 'avg_passing'
  | 'avg_dribbling';

export type LevelSkills =
  | 'novice'
  | 'beginner'
  | 'intermediate'
  | 'advanced'
  | 'expert';

export type AverageSkillNumericRating = Record<AverageSkill, number>;

export type LevelSkillRating = Record<AverageSkill, LevelSkills>;

export type UserStats = {
  nb_mvp: number;
  nb_best_striker: number;
  user_own_evaluation: Skills | undefined;
  avg_evaluation_received: AverageSkills | undefined;
};

export class SkillEntity {
  pace: number;
  shooting: number;
  passing: number;
  dribbling: number;
  defending: number;
  rater_id: string;
  reviewee_id: string;
  event_id?: number;

  constructor({
    pace,
    shooting,
    passing,
    dribbling,
    defending,
    rater_id,
    reviewee_id,
    event_id,
  }: {
    pace: number;
    shooting: number;
    passing: number;
    dribbling: number;
    defending: number;
    rater_id: string;
    reviewee_id: string;
    event_id?: number;
  }) {
    this.pace = new SkillRating(pace).skill;
    this.shooting = new SkillRating(shooting).skill;
    this.passing = new SkillRating(passing).skill;
    this.dribbling = new SkillRating(dribbling).skill;
    this.defending = new SkillRating(defending).skill;
    this.rater_id = rater_id;
    this.reviewee_id = reviewee_id;
    this.event_id = event_id;
  }
}
