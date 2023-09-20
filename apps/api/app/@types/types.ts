import { NextFunction, Request, Response } from "express";

export type Controller = (
  req: Request,
  res: Response,
  next?: NextFunction
) => any | Promise<any>;

export const canals = {
  body: "body",
  params: "params",
  query: "query",
} as const;

export type LevelScale =
  | "beginner"
  | "novice"
  | "intermediate"
  | "advanced"
  | "expert";

export type EventStatus = "open" | "full" | "completed" | "cancelled";

export type InvitationStatus = "pending" | "confirmed" | "declined";

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
  ids: string[];
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
