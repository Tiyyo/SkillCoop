export type ActionEventQueue = 'create_event' | 'delete_event';

export type EventQueuePublisher = {
  event_id: number;
  organizer_id: number;
  participants_id?: Array<number>;
  title?: string;
  action: ActionEventQueue;
};

export type ActionParticipantQueue = 'add_participant' | 'remove_participant';

export type ParticipantQueuePublisher = {
  event_id: number;
  participants_id: Array<number>;
  action: ActionParticipantQueue;
};

export type ActionUserQueue = 'create' | 'update' | 'delete';

export type UserQueuePublisher = {
  profile_id: number;
  username?: string;
  avatar?: string | null;
  action: ActionUserQueue;
};

export const queues = {
  user: 'user-queue',
  event: 'event-queue',
  participant: 'participant-queue',
} as const;
