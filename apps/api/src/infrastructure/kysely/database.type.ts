import type { ColumnType } from 'kysely';
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type best_striker_poll = {
  event_id: number;
  profile_id: string;
  rater_id: string;
  created_at: string;
  updated_at: string | null;
};
export type event = {
  id: Generated<number>;
  date: string;
  duration: number;
  required_participants: number;
  price: number | null;
  nb_teams: number;
  /**
   * @kyselyType('public' | 'private')
   */
  visibility: 'public' | 'private';
  location_id: number;
  organizer_id: string | null;
  status_name: string;
  mvp_id: string | null;
  best_striker_id: string | null;
  created_at: string;
  updated_at: string | null;
};
export type image = {
  id: number;
  url: string;
  key: string | null;
  size: number | null;
  created_at: string;
  updated_at: string | null;
};
export type language_preference = {
  user_id: string;
  /**
   * @kyselyType(string)
   */
  name: string;
  created_at: string;
  updated_at: string | null;
};
export type mvp_poll = {
  event_id: number;
  profile_id: string;
  rater_id: string;
  created_at: string;
  updated_at: string | null;
};
export type notification = {
  id: number;
  profile_id: string;
  instigator_id: string | null;
  event_id: number | null;
  img_url: string | null;
  type_name: string | null;
  subtype: string | null;
  message: string;
  is_read: number; // boolean
  created_at: string;
  updated_at: string | null;
};
export type notification_preference = {
  user_id: string;
  type_name: string;
  email: number; //boolean
  push: number; // boolean
  website: number; // boolean
  created_at: string;
  updated_at: string | null;
};

export type notification_type = {
  name: string;
  created_at: string;
  updated_at: string | null;
};
export type playground = {
  id: number;
  name: string;
  address: string;
  city: string;
  post_code: string;
  region: string;
  country: string;
  longitude: number;
  latitude: number;
  created_at: string;
  updated_at: string | null;
};
export type profile = {
  profile_id: string;
  username: string;
  first_name: string | null;
  last_name: string | null;
  location: string | null;
  date_of_birth: string | null;
  avatar_url: string | null;
  last_evaluation: number | null;
  active_notification: number; // boolean;
  created_at: string;
  updated_at: string | null;
};
export type profile_on_event = {
  profile_id: string;
  event_id: number;
  team: number | null;
  status_name: string;
  created_at: string;
  updated_at: string | null;
};
export type profile_on_profile = {
  adder_id: string;
  friend_id: string;
  status_name: string | null;
  created_at: string;
  updated_at: string | null;
};
export type score = {
  id: number;
  score_team_1: number;
  score_team_2: number;
  event_id: number;
  created_at: string;
  updated_at: string | null;
};
export type skill_foot = {
  id: number;
  pace: number;
  shooting: number;
  passing: number;
  dribbling: number;
  defending: number;
  created_at: string;
  updated_at: string | null;
  rater_id: string;
  reviewee_id: string;
  event_id: number | null;
};
export type sport = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string | null;
};
export type status = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string | null;
};
export type theme_preference = {
  user_id: string;
  /**
   * @kyselyType('light' | 'dark')
   */
  name: 'light' | 'dark';
  created_at: string;
  updated_at: string | null;
};
export type user = {
  id: string;
  email: string;
  password: string;
  verified: Generated<number>;
  blocked: Generated<number>;
  failed_attempts: Generated<number>;
  created_at: string;
  updated_at: string | null;
};
export type DB = {
  best_striker_poll: best_striker_poll;
  event: event;
  image: image;
  language_preference: language_preference;
  mvp_poll: mvp_poll;
  notification: notification;
  notification_preference: notification_preference;
  notification_type: notification_type;
  playground: playground;
  profile: profile;
  profile_on_event: profile_on_event;
  profile_on_profile: profile_on_profile;
  score: score;
  skill_foot: skill_foot;
  sport: sport;
  status: status;
  theme_preference: theme_preference;
  user: user;
};

