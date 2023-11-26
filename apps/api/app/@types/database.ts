import type { ColumnType } from 'kysely';
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type best_striker_poll = {
  event_id: number;
  profile_id: number;
  rater_id: number;
  created_at: string;
  updated_at: string | null;
};
export type event = {
  id: Generated<number>;
  date: string;
  duration: number;
  location: string;
  required_participants: number;
  nb_teams: Generated<number>;
  organizer_id: number | null;
  status_name: string;
  created_at: string;
  updated_at: string | null;
  mvp_id: number | null;
  best_striker_id: number | null;
};
export type image = {
  id: Generated<number>;
  url: string;
  key: string | null;
  size: number | null;
  created_at: string;
  updated_at: string | null;
};
export type mvp_poll = {
  event_id: number;
  profile_id: number;
  rater_id: number;
  created_at: string;
  updated_at: string | null;
};
export type notification = {
  id: Generated<number>;
  profile_id: number;
  instigator_id: number | null;
  event_id: number | null;
  type: string;
  message: string;
  is_read: Generated<number>;
  created_at: string;
  updated_at: string | null;
};
export type profile = {
  id: Generated<number>;
  user_id: number;
  username: string | null;
  first_name: string | null;
  last_name: string | null;
  location: string | null;
  date_of_birth: string | null;
  avatar_url: string | null;
  last_evaluation: number | null;
  active_notification: Generated<number>;
};
export type profile_on_event = {
  profile_id: number;
  event_id: number;
  team: number | null;
  status_name: string;
  created_at: string;
  updated_at: string | null;
};
export type profile_on_profile = {
  adder_id: number;
  friend_id: number;
  status_name: string | null;
  created_at: string;
  updated_at: string | null;
};
export type score = {
  id: Generated<number>;
  score_team_1: number;
  score_team_2: number;
  event_id: number;
  created_at: string;
  updated_at: string | null;
};
export type skill_foot = {
  id: Generated<number>;
  pace: number;
  shooting: number;
  passing: number;
  dribbling: number;
  defending: number;
  created_at: string;
  updated_at: string | null;
  rater_id: number;
  reviewee_id: number;
  event_id: number | null;
};
export type sport = {
  id: Generated<number>;
  name: string;
  created_at: string;
  updated_at: string | null;
};
export type status = {
  id: Generated<number>;
  name: string;
  created_at: string;
  updated_at: string | null;
};
export type user = {
  id: Generated<number>;
  email: string;
  password: string;
  verified: Generated<number>;
  created_at: string;
  updated_at: string | null;
};
export type DB = {
  best_striker_poll: best_striker_poll;
  event: event;
  image: image;
  mvp_poll: mvp_poll;
  notification: notification;
  profile: profile;
  profile_on_event: profile_on_event;
  profile_on_profile: profile_on_profile;
  score: score;
  skill_foot: skill_foot;
  sport: sport;
  status: status;
  user: user;
};
