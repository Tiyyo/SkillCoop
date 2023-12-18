import { EventParticipant, InvitationStatus } from ".";

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

export type EventStatus = 'open' | 'full' | 'completed' | 'cancelled';

export const eventStatus = {
  open: 'open',
  full: 'full',
  completed: 'completed',
  cancelled: 'cancelled',
} as const;

export type CreateEventData = {
  date: string;
  start_time: string;
  start_date: string;
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

export type SearchEventQuery = {
  location: string;
  date: string;
  page?: number;
};

export type EventQuery = {
  profileId: number;
  page: number;
}