import { EventStatus } from '../value-objects/event-status.vo';

export class EventEntity {
  id: string;
  date: string;
  duration: number;
  required_participants: number;
  price?: number | null;
  nb_teams?: number = 2;
  visibility?: string = 'private';
  location_id: string;
  organizer_id: string;
  status: EventStatus;
  mvp_id?: string;
  best_striker_id?: string;

  constructor({
    id,
    date,
    duration,
    required_participants,
    price,
    nb_teams,
    visibility,
    location_id,
    organizer_id,
    status,
    mvp_id,
    best_striker_id,
  }: {
    id: string;
    date: string;
    duration: number;
    required_participants: number;
    price: number;
    nb_teams?: number;
    visibility?: string;
    location_id: string;
    organizer_id: string;
    status: EventStatus;
    mvp_id?: string;
    best_striker_id?: string;
  }) {
    this.id = id;
    this.date = date;
    this.location_id = location_id;
    this.status = new EventStatus('open');
    this.duration = duration;
    this.required_participants = required_participants;
    this.price = price;
    this.nb_teams = nb_teams ?? 2;
    this.visibility = visibility ?? 'private';
    this.organizer_id = organizer_id;
  }
}
