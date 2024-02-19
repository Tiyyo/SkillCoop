import { SkillRating } from '../value-objects/skill-rating.vo';

export class SkillEntity {
  pace: SkillRating;
  shooting: SkillRating;
  passing: SkillRating;
  dribbling: SkillRating;
  defending: SkillRating;
  rater_id: string;
  reviewee_id: string;
  event_id: string;

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
    event_id: string;
  }) {
    this.pace = new SkillRating(pace);
    this.shooting = new SkillRating(shooting);
    this.passing = new SkillRating(passing);
    this.dribbling = new SkillRating(dribbling);
    this.defending = new SkillRating(defending);
    this.rater_id = rater_id;
    this.reviewee_id = reviewee_id;
    this.event_id = event_id;
  }
}
