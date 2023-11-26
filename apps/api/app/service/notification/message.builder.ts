import { BuildersNotificationMessage, NotificationType, notificationType } from './types';

export class BuildNotificationMessage {
  type: NotificationType;
  constructor(type: NotificationType) {
    this.type = type;
  }
  getBuilder(type: NotificationType) {
    const builders: BuildersNotificationMessage = {
      [notificationType.eventInfosHasBeenUpdated]: this.buildEventInfosHasBeenUpdatedMessage,
      [notificationType.userHasBeenInvitedToEvent]: this.buildUserHasBeenInvitedToEventMessage,
      [notificationType.userReceivedFriendRequest]: this.buildUserReceivedFriendRequestMessage,
      [notificationType.userHasBeenAddedToFriendlist]:
        this.buildUserHasBeenAddedToFriendlistMessage,
    };
    return builders[type];
  }
  buildEventInfosHasBeenUpdatedMessage(eventDate: string) {
    return `Certain details for the event scheduled on ${eventDate},
in which you are participating, have been updated`;
  }
  buildUserHasBeenInvitedToEventMessage(username: string, eventDate: string) {
    return `You have been invited by ${username} to an event on ${eventDate}`;
  }
  buildUserReceivedFriendRequestMessage(username: string) {
    return `You have received a friend request from ${username}`;
  }
  buildUserHasBeenAddedToFriendlistMessage(username: string) {
    return `You are now friend with ${username}`;
  }
}
