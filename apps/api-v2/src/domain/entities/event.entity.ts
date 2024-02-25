import { EventStatus } from '../value-objects/event-status.vo';
import { InvitationStatus } from '../value-objects/invitation-status.vo';
import { TInvitationStatus } from './event-participant.entity';

export class EventCoreEntity {
  domain_id: string;
  date: string;
  duration: number;
  required_participants: number;
  price?: number | null;
  nb_teams?: number = 2;
  visibility?: string = 'private';
  location_id: number;
  organizer_id: string;
  status_name: string;

  constructor({
    date,
    duration,
    required_participants,
    price,
    nb_teams,
    visibility,
    location_id,
    organizer_id,
  }: {
    id: string;
    date: string;
    duration: number;
    required_participants: number;
    price: number;
    nb_teams?: number;
    visibility?: string;
    location_id: number;
    organizer_id: string;
    status_name: EventStatus;
  }) {
    this.date = date;
    this.location_id = location_id;
    this.status_name = 'open';
    this.duration = duration;
    this.required_participants = required_participants;
    this.price = price;
    this.nb_teams = nb_teams ?? 2;
    this.visibility = visibility ?? 'private';
    this.organizer_id = organizer_id;
  }
}

export type EventParticipant = {
  profile_id: string;
  username: string;
  avatar: string | null;
  status: string;
  last_evaluation: number | null;
  team: number | null;
};

export type EventAggr = EventCoreEntity & {
  location: string;
  playground_city: string;
  playground_address: string;
  mvp_id: string | null;
  best_striker_id: string | null;
  score_team_1: number | null;
  score_team_2: number | null;
  participants: EventParticipant[];
  confirmed_participants: number;
  user_status: string;
};

export type LastSharedEvent = {
  event_id: number;
  date: string;
  duration: number;
  location: string;
  playground_city: string;
  playground_address: string;
  location_id: number;
  score_team_1: number;
  score_team_2: number;
  participants: Array<{
    profile_id: string;
    username: string;
    avatar: string | null;
    team: number;
  }>;
};

export type EventLocation = {
  id: number;
  country: string;
  latitude: number;
  longitude: number;
};

export type EventFoundedNearby = {
  id: number;
  date: string;
  duration: number;
  required_participants: number;
  price: number | null;
  playground_name: string;
  playground_city: string;
  organizer_username: string;
  organizer_avatar: string | null;
  confirmed_participants: number | null;
  average_event_evaluation: number | null;
};
