import { InvitationStatus } from "./invitation";

export type EventParticipant = {
  profile_id: number;
  username: string;
  avatar: string;
  status: InvitationStatus;
  last_evaluation?: number;
  team?: number;
};

export type UpdateParticipant = {
  event_id: number;
  profile_id: number;
  status_name: InvitationStatus;
};