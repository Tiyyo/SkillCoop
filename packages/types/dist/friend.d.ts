import { InvitationStatus } from ".";
export type Friend = {
    adder_id: string;
    friend_id: string;
    username: string;
    avatar_url: string;
    status_name: InvitationStatus;
    last_evaluation?: number | null;
};
export type SearchFriendQuery = {
    username: string;
    profile: string;
    page?: number;
};
