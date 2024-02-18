import { InvitationStatus } from ".";

export type Friend = {
  adder_id: number;
  friend_id: number;
  username: string;
  avatar_url: string;
  status_name: InvitationStatus;
  last_evaluation?: number | null;
};

export type SearchFriendQuery = {
  username: string;
  profile: number;
  page?: number;
};
