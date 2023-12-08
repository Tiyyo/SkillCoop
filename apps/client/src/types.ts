export type LevelScale =
  | 'beginner'
  | 'novice'
  | 'intermediate'
  | 'advanced'
  | 'expert';

export type EventStatus = 'open' | 'full' | 'completed' | 'cancelled';

export type InvitationStatus = 'pending' | 'confirmed' | 'declined';

export type InvitationPageVariant = 'update' | 'mutate';

export const invitationStatus = {
  pending: 'pending',
  confirmed: 'confirmed',
  declined: 'declined',
} as const;

export const eventStatus = {
  open: 'open',
  full: 'full',
  completed: 'completed',
  cancelled: 'cancelled',
} as const;

export const invitationPageVariant = {
  update: 'update',
  mutate: 'mutate',
} as const;

export type User = {
  email: string;
  password: string;
};

export type RegisterUser = {
  email: string;
  password: string;
  confirmedPassword: string;
  termAndService: boolean | string;
};

export type SearchProfileQuery = {
  username: string;
  page?: number;
  userProfileId: number;
};

export type SearchEventQuery = {
  location: string;
  date: string;
  page?: number;
};

export type Bonus = {
  nb_mvp_bonus: number;
  nb_best_striker_bonus: number;
};

export type Profile = {
  user_id: number;
  avatar_url: string | null;
  username: string;
  date_of_birth: string | null;
  profile_id: number;
  email?: string | null;
  nb_events?: number | null;
  first_name?: string | null;
  last_name?: string | null;
  location?: string | null;
  gb_rating?: number | null;
  nb_review?: number | null;
  nb_bonus?: Bonus;
  nb_attended_events?: number | null;
  relation_exists: number | null;
  last_evaluation: number | null;
};

export type ProfileEval = {
  gb_rating: number;
  avg_pace: number;
  avg_defending: number;
  avg_passing: number;
  avg_dribbling: number;
  avg_shooting: number;
};

export type EventParticipant = {
  profile_id: number;
  username: string;
  avatar: string;
  status: InvitationStatus;
  last_evaluation?: number;
  team?: number;
};

export type CreateEventData = {
  date: string;
  duration: number;
  location: string;
  required_participants: number;
  organizer_id: number;
  status_name: 'open';
  participants?: number[];
};

export type UpdateEventData = Omit<CreateEventData, 'status_name'> & {
  status_name: EventStatus;
  event_id: number;
  profile_id: number;
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
  last_evaluation?: number | null;
};

export type Vote = {
  profile_id: number;
  rater_id: number;
  event_id: number;
};

export type ScaleLevel =
  | 'beginner'
  | 'novice'
  | 'intermediate'
  | 'advanced'
  | 'expert';

export type EvaluationOwnSkill = {
  defending: ScaleLevel;
  dribbling: ScaleLevel;
  pace: ScaleLevel;
  passing: ScaleLevel;
  shooting: ScaleLevel;
  profile_id: number;
};

export type EvaluationParticipantSkill = {
  defending: number;
  dribbling: number;
  pace: number;
  passing: number;
  shooting: number;
  event_id: number;
  rater_id: number;
  reviewee_id: number;
};

export type UpdateParticipant = {
  event_id: number;
  profile_id: number;
  status_name: InvitationStatus;
};

export type DeleteEventData = {
  event_id: number;
  profile_id: number;
};

export type SaveScore = {
  event_id: number;
  score_team_1: number;
  score_team_2: number;
};

export type TransfertOwnership = {
  event_id: number;
  organizer_id: number;
  new_organizer_id: number;
};

export type EventInvitation = {
  event_id: number;
  initiator?: number;
  ids: number[];
};

export type CreateFriendsInvitation = {
  adder_id: number;
  friend_id: number;
};

export type UpdateFriendsInvitation = {
  adder_id: number;
  friend_id: number;
  status_name: InvitationStatus;
};

export type UpdateEmail = {
  email: string;
  user_id: number;
};

export type NotificationType = 'event' | 'friend';

export type Notification = {
  id: number;
  profile_id: number;
  type: NotificationType;
  subtype: string;
  img_url?: string | null;
  is_read: number;
  message: string;
  instigator_id?: number | null;
  event_id?: number | null;
  created_at: string;
};

export const notificationSubtype = {
  eventInfosHasBeenUpdated: 'eventInfosHasBeenUpdated',
  userHasBeenInvitedToEvent: 'userHasBeenInvitedToEvent',
  userReceivedFriendRequest: 'userReceivedFriendRequest',
  userHasBeenAddedToFriendlist: 'userHasBeenAddedToFriendlist',
  teamHasBeenGenerated: 'teamHasBeenGenerated',
  transfertOwnership: 'transfertOwnership',
} as const;

export const notificationType = {
  event: 'event',
  friend: 'friend',
} as const;

export type NotificationFilters = 'event' | 'friend' | 'all';

export const notificationFilters = {
  event: 'event',
  friend: 'friend',
  all: 'all',
} as const;
