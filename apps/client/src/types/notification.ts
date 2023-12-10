export type NotificationType = 'event' | 'friend';

export type NotificationSubtype =
  | 'eventInfosHasBeenUpdated'
  | 'userHasBeenInvitedToEvent'
  | 'userReceivedFriendRequest'
  | 'userHasBeenAddedToFriendlist'
  | 'teamHasBeenGenerated'
  | 'transfertOwnership'

export type Notification = {
  id: number;
  profile_id: number;
  type: NotificationType;
  subtype: NotificationSubtype;
  img_url?: string | null;
  is_read: 0 | 1;
  message: string;
  instigator_id?: number | null;
  event_id?: number | null;
  created_at: string;
};

export type NotificationFilters = 'event' | 'friend' | 'all';

export const notificationType = {
  event: 'event',
  friend: 'friend',
} as const;

export const notificationSubtype = {
  eventInfosHasBeenUpdated: 'eventInfosHasBeenUpdated',
  userHasBeenInvitedToEvent: 'userHasBeenInvitedToEvent',
  userReceivedFriendRequest: 'userReceivedFriendRequest',
  userHasBeenAddedToFriendlist: 'userHasBeenAddedToFriendlist',
  teamHasBeenGenerated: 'teamHasBeenGenerated',
  transfertOwnership: 'transfertOwnership',
} as const;

export const notificationFilters = {
  event: 'event',
  friend: 'friend',
  all: 'all',
} as const;