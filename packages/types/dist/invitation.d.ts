export type InvitationStatus = 'pending' | 'confirmed' | 'declined';
export type InvitationPageVariant = 'update' | 'mutate';
export declare const invitationStatus: {
    readonly pending: "pending";
    readonly confirmed: "confirmed";
    readonly declined: "declined";
};
export declare const invitationPageVariant: {
    readonly update: "update";
    readonly mutate: "mutate";
};
export type EventInvitation = {
    event_id: number;
    initiator?: number;
    ids: number[];
};
export type CreateFriendsInvitation = {
    adder_id: number;
    friend_id: number;
};
export type UpdateFriendsInvitation = {
    adder_id: number;
    friend_id: number;
    status_name: InvitationStatus;
};
