import { EventParticipant, InvitationStatus } from ".";

export type EventWithoutAggr = {
  id: number
  date: string;
  duration: number;
  location_id: number;
  required_participants: number;
  nb_teams: number;
  organizer_id: string | null;
  mvp_id?: number | null;
  best_striker_id?: number | null;
  status_name: string;
}

export type EventType = {
  event_id: number;
  date: string;
  duration: number;
  location: string;
  location_id: number;
  price: number | null
  visibility: Visibility;
  playground_city: string;
  playground_address: string;
  required_participants: number;
  nb_teams: number;
  organizer_id: string;
  mvp_id?: string | null;
  best_striker_id?: string | null;
  status_name: EventStatus;
  score_team_1: number | null;
  score_team_2: number | null;
  user_status: InvitationStatus;
  participants: EventParticipant[] | string;
  confirmed_participants: number;
};

export type EventStatus = 'open' | 'full' | 'completed' | 'cancelled';

export type Visibility = 'private' | 'public';

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
  organizer_id: string;
  status_name: 'open';
  participants?: number[];
  visibility: Visibility;
  price: number | null;
};

export type UpdateEventData = Omit<CreateEventData, 'status_name'> & {
  status_name: EventStatus;
  event_id: number;
  profile_id: string;
};

export type DeleteEventData = {
  event_id: number;
  profile_id: string;
};

export type SaveScore = {
  event_id: number;
  score_team_1: number;
  score_team_2: number;
};

export type TransfertOwnership = {
  event_id: number;
  organizer_id: string;
  new_organizer_id: string;
};

export type SearchEventQuery = {
  location: string;
  date: string;
  page?: number;
};

export type EventQuery = {
  profileId: string;
  page: number;
}

export type NearestEventInfos = {
  id: number;
  required_participants: number;
  confirmed_participants: number;
  organizer_avatar: string | null;
  organizer_username: string;
  date: string;
  duration: number;
  average_event_evaluation: number;
  playground_name: string;
  playground_city: string;
  price: number | undefined | null;
}

export type NearestEventQuery = {
  userCountry: string;
  userLatitude: number;
  userLongitude: number;
  distance: number;
  profileId: string;
}