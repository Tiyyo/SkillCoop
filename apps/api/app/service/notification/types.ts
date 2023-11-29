export type NotificationType =
  | 'eventInfosHasBeenUpdated'
  | 'userHasBeenInvitedToEvent'
  | 'userReceivedFriendRequest'
  | 'userHasBeenAddedToFriendlist';

export const notificationType = {
  eventInfosHasBeenUpdated: 'eventInfosHasBeenUpdated',
  userHasBeenInvitedToEvent: 'userHasBeenInvitedToEvent',
  userReceivedFriendRequest: 'userReceivedFriendRequest',
  userHasBeenAddedToFriendlist: 'userHasBeenAddedToFriendlist',
} as const;

export type BuilderEventInfosNotificationMessage = (eventDate: string) => string;

export type BuilderUserInvitedToEventNotificationMessage = (
  username: string,
  eventDate: string,
) => string;

export type BuilderFriendRequestNotificationMessage = (username: string) => string;

export type BuilderAddedToFriendlistNotificationMessage = (username: string) => string;

export type BuilderNotificationMessage =
  | BuilderEventInfosNotificationMessage
  | BuilderUserInvitedToEventNotificationMessage
  | BuilderFriendRequestNotificationMessage
  | BuilderAddedToFriendlistNotificationMessage;

export type BuildersNotificationMessage = {
  [notificationType.eventInfosHasBeenUpdated]: BuilderEventInfosNotificationMessage;
  [notificationType.userHasBeenInvitedToEvent]: BuilderUserInvitedToEventNotificationMessage;
  [notificationType.userReceivedFriendRequest]: BuilderFriendRequestNotificationMessage;
  [notificationType.userHasBeenAddedToFriendlist]: BuilderAddedToFriendlistNotificationMessage;
};

export type NotificationParams = {
  profileId: number;
  message: string;
  type: NotificationType;
  instigatorId?: number;
  eventId?: number;
};

export type SSENotificationData = {
  profileId: number;
  message: string;
};
