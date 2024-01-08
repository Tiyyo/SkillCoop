export type NotificationType = 'event' | 'friend' | 'system' | 'message';

export type NotificationParams = {
  profileId: number;
  message: string;
  type_name: NotificationType;
  subtype: NotificationSubtype;
  img_url?: string | null;
  instigatorId?: number;
  eventId?: number;
};

export type BuilderEventInfosNotificationMessage = (eventDate: string) => string;

export type BuilderUserInvitedToEventNotificationMessage = (
  username: string,
  eventDate: string,
) => string;

export type BuilderFriendRequestNotificationMessage = (username: string) => string;

export type BuilderAddedToFriendlistNotificationMessage = (username: string) => string;

export type BuildTeamsHasBeenGeneratedMessage = (eventDate: string) => string;

export type BuilderTransfertOwnershipMessage = (username: string, eventDate: string) => string;

export type BuilderNotificationMessage =
  | BuilderEventInfosNotificationMessage
  | BuilderUserInvitedToEventNotificationMessage
  | BuilderFriendRequestNotificationMessage
  | BuilderAddedToFriendlistNotificationMessage
  | BuildTeamsHasBeenGeneratedMessage
  | BuilderTransfertOwnershipMessage;

export type BuildersNotificationMessage = {
  [notificationSubtype.eventInfosHasBeenUpdated]: BuilderEventInfosNotificationMessage;
  [notificationSubtype.userHasBeenInvitedToEvent]: BuilderUserInvitedToEventNotificationMessage;
  [notificationSubtype.userReceivedFriendRequest]: BuilderFriendRequestNotificationMessage;
  [notificationSubtype.userHasBeenAddedToFriendlist]: BuilderAddedToFriendlistNotificationMessage;
  [notificationSubtype.teamHasBeenGenerated]: BuildTeamsHasBeenGeneratedMessage;
  [notificationSubtype.transfertOwnership]: BuilderTransfertOwnershipMessage;
};

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
  type_name: NotificationType;
  subtype: NotificationSubtype;
  img_url?: string | null;
  is_read: 0 | 1;
  message: string;
  instigator_id?: number | null;
  event_id?: number | null;
  created_at: string;
};

export type NotificationFilters = 'event' | 'friend' | 'all';

export type SSENotificationData = {
  profileId: number;
  message: string;
};

export const notificationType = {
  event: 'event',
  friend: 'friend',
  system: 'system',
  message: 'message',
} as const

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

