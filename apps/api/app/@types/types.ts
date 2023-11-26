import { NextFunction, Request, Response } from 'express';

export type Controller = (req: Request, res: Response, next?: NextFunction) => any | Promise<any>; // eslint-disable-line

// find a less confusuing name
export type ObjectRecordGeneric = Record<string, string | number | boolean | null>;

export const canals = {
  body: 'body',
  params: 'params',
  query: 'query',
} as const;

export type LevelScale = 'beginner' | 'novice' | 'intermediate' | 'advanced' | 'expert';

export type EventStatus = 'open' | 'full' | 'completed' | 'cancelled';

export const eventStatus = {
  open: 'open',
  full: 'full',
  completed: 'completed',
  cancelled: 'cancelled',
} as const;

export type InvitationStatus = 'pending' | 'confirmed' | 'declined';

export const invitationStatus = {
  pending: 'pending',
  confirmed: 'confirmed',
  declined: 'declined',
} as const;

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

export type EventParticipant = {
  profile_id: number;
  username: string;
  avatar?: string;
  status: InvitationStatus;
  team?: number;
};

export type EventType = {
  event_id: number;
  date: string;
  duration: number;
  location: string;
  required_participants: number;
  nb_teams: number;
  organizer_id: number;
  status_name: EventStatus;
  score_team_1: number | null;
  score_team_2: number | null;
  user_status: InvitationStatus;
  participants: EventParticipant[] | string;
  confirmed_participants: number;
};

export type ProfileType = {
  profile_id: number;
  user_id?: number;
  avatar_url?: number;
  date_of_birth?: string;
  last_evaluation?: number;
  relation_exist?: boolean;
};

export type SendConfirmationEmail = {
  emailToken: string;
  email: string;
  userId: number;
};

export type SendResetPasswordEmail = {
  resetToken: string;
  email: string;
  userId: number;
};
