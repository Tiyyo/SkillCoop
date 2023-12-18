export type LevelScale =
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
  defending: LevelScale;
  dribbling: LevelScale;
  pace: LevelScale;
  passing: LevelScale;
  shooting: LevelScale;
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

export type Score = {
  avg_pace: number;
  avg_shooting: number;
  avg_passing: number;
  avg_dribbling: number;
  avg_defending: number;
};

export type Player = {
  profile_id: number;
  gb_rating: number;
};

export type TeamGeneratorConfig = {
  team1: Player[];
  team2: Player[];
  ids: number[];
  values: number[];
  participants: number;
};