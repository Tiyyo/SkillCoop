import { InvitationStatus } from "./invitation";

export type EventParticipant = {
  profile_id: number;
  username: string;
  avatar: string | null;
  status: InvitationStatus;
  last_evaluation?: number | null;
  team?: number;
};

export type UpdateParticipant = {
  event_id: number;
  profile_id: number;
  status_name: InvitationStatus;
};