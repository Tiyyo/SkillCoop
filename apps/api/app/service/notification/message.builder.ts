import { BuildersNotificationMessage, NotificationType, notificationType } from './types';
import dateHandller from '../../utils/date-format';

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
    const formatedEventDate = dateHandller.formatDateAndTime(eventDate);
    return `Certain details for the event scheduled on ${formatedEventDate},
in which you are participating, have been updated`;
  }
  buildUserHasBeenInvitedToEventMessage(username: string, eventDate: string) {
    const formatedEventDate = dateHandller.formatDateAndTime(eventDate);
    return `You have been invited by ${username} to an event on ${formatedEventDate}`;
  }
  buildUserReceivedFriendRequestMessage(username: string) {
    return `You have received a friend request from ${username}`;
  }
  buildUserHasBeenAddedToFriendlistMessage(username: string) {
    return `You are now friend with ${username}`;
  }
}
