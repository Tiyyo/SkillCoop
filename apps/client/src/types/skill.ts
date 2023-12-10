export type LevelScale =
  | 'beginner'
  | 'novice'
  | 'intermediate'
  | 'advanced'
  | 'expert';

export type ScaleLevel =
  | 'beginner'
  | 'novice'
  | 'intermediate'
  | 'advanced'
  | 'expert';

export type ProfileEval = {
  gb_rating: number;
  avg_pace: number;
  avg_defending: number;
  avg_passing: number;
  avg_dribbling: number;
  avg_shooting: number;
};

export type Vote = {
  profile_id: number;
  rater_id: number;
  event_id: number;
};

export type EvaluationOwnSkill = {
  defending: ScaleLevel;
  dribbling: ScaleLevel;
  pace: ScaleLevel;
  passing: ScaleLevel;
  shooting: ScaleLevel;
  profile_id: number;
};

export type Skills = {
  defending: number;
  dribbling: number;
  passing: number;
  shooting: number;
  pace: number;
};

export type EvaluationParticipantSkill = Skills & {
  event_id: number;
  rater_id: number;
  reviewee_id: number;
};