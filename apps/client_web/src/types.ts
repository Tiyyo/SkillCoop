export type LevelScale =
  | "beginner"
  | "novice"
  | "intermediate"
  | "advanced"
  | "expert";

export type EventStatus = "open" | "full" | "completed" | "cancelled";

export type InvitationStatus = "pending" | "confirmed" | "declined";

export const invitationStatus = {
  pending: "pending",
  confirmed: "confirmed",
  declined: "declined",
} as const;

export type User = {
  email: string;
  password: string;
};

export type RegisterUser = User & {
  confirmedPassword: string;
  termAndService: boolean | string;
};

export type SearchProfileQuery = {
  username: string;
  page?: number;
  userProfileId: number;
};

export type Profile = {
  user_id: number;
  avatar_url: string | null;
  username: string;
  date_of_birth: Date | null;
  profile_id: number;
  nb_reviews: number;
  avg_pace: number | null;
  avg_shooting: number | null;
  avg_dribbling: number | null;
  avg_defending: number | null;
  avg_passing: number | null;
  gb_rating: number | null;
  relation_exists: number | null;
};

export type EventParticipant = {
  profile_id: number;
  username: string;
  avatar: string;
  status: InvitationStatus;
  team?: number;
};

export type CreateEventData = {
  date: string;
  duration: number;
  location: string;
  required_participants: number;
  organizer_id: number;
  status_name: "open";
  participants?: number[];
};

export type EventType = {
  event_id: number;
  date: string;
  duration: number;
  location: string;
  required_participants: number;
  nb_teams: number;
  organizer_id: number;
  mvp_id?: number | null;
  best_striker_id?: number | null;
  status_name: EventStatus;
  score_team_1: number | null;
  score_team_2: number | null;
  user_status: InvitationStatus;
  participants: EventParticipant[] | string;
  confirmed_participants: number;
};

export type SearchFriendQuery = {
  username: string;
  profile: number;
  page?: number;
};

export type Friend = {
  adder_id: number;
  friend_id: number;
  username: string;
  avatar_url: string;
  status_name: InvitationStatus;
};

export type Vote = {
  profile_id: number;
  rater_id: number;
  event_id: number;
}

export type ScaleLevel = 'beginner' | 'novice' | 'intermediate' | 'advanced' | 'expert'

export type EvaluationOwnSkill = {
  defending: ScaleLevel;
  dribbling: ScaleLevel;
  pace: ScaleLevel;
  passing: ScaleLevel;
  shooting: ScaleLevel;
  profile_id: number;
}
