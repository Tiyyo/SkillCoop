import { InvitationStatus } from "./invitation";

export type EventParticipant = {
  profile_id: string;
  username: string;
  avatar: string | null;
  status: InvitationStatus;
  last_evaluation?: number | null;
  team?: number;
};

export type UpdateParticipant = {
  event_id: number;
  profile_id: string;
  status_name: InvitationStatus;
};