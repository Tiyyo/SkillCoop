export type ActionEventQueue = 'create_event' | 'delete_event';
export type EventQueuePublisher = {
    event_id: number;
    organizer_id: string;
    participants_id?: Array<string>;
    title?: string;
    action: ActionEventQueue;
};
export type ActionParticipantQueue = 'add_participant' | 'remove_participant';
export type ParticipantQueuePublisher = {
    event_id: number;
    participants_id: Array<string>;
    action: ActionParticipantQueue;
};
export type ActionUserQueue = 'create' | 'update' | 'delete';
export type UserQueuePublisher = {
    profile_id: string;
    username?: string;
    avatar?: string | null;
    action: ActionUserQueue;
};
export declare const queues: {
    readonly user: "user-queue";
    readonly event: "event-queue";
    readonly participant: "participant-queue";
};
