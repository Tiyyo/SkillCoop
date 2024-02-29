export type InvitationStatus = 'pending' | 'confirmed' | 'declined' | 'requested' | 'refused';
export type InvitationPageVariant = 'update' | 'mutate';
export declare const invitationStatus: {
    readonly pending: "pending";
    readonly confirmed: "confirmed";
    readonly declined: "declined";
    readonly requested: "requested";
    readonly refused: "refused";
};
export declare const invitationPageVariant: {
    readonly update: "update";
    readonly mutate: "mutate";
};
export type EventInvitation = {
    event_id: number;
    initiator?: string;
    ids: string[];
};
export type EventParticipationRequest = {
    event_id: number;
    profile_id: string;
};
export type CreateFriendsInvitation = {
    adder_id: string;
    friend_id: string;
};
export type UpdateFriendsInvitation = {
    adder_id: string;
    friend_id: string;
    status_name: InvitationStatus;
};
