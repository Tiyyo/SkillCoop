import type {
  BuildersNotificationMessage,
  NotificationSubtype,
} from '@skillcoop/types';
import { notificationSubtype } from '@skillcoop/types';
import { formatEventDateAndTime } from '@skillcoop/date-handler';

export class BuildNotificationMessage {
  subtype: NotificationSubtype;
  constructor(subtype: NotificationSubtype) {
    this.subtype = subtype;
  }
  getBuilder(subtype: NotificationSubtype) {
    const builders: BuildersNotificationMessage = {
      [notificationSubtype.eventInfosHasBeenUpdated]:
        this.buildEventInfosHasBeenUpdatedMessage,
      [notificationSubtype.userHasBeenInvitedToEvent]:
        this.buildUserHasBeenInvitedToEventMessage,
      [notificationSubtype.userReceivedFriendRequest]:
        this.buildUserReceivedFriendRequestMessage,
      [notificationSubtype.userHasBeenAddedToFriendlist]:
        this.buildUserHasBeenAddedToFriendlistMessage,
      [notificationSubtype.teamHasBeenGenerated]:
        this.buildTeamsHasBeenGeneratedMessage,
      [notificationSubtype.transfertOwnership]:
        this.buildTransfertOwnershipMessage,
    };
    return builders[subtype];
  }
  buildEventInfosHasBeenUpdatedMessage(eventDate: string) {
    const formatedEventDate = formatEventDateAndTime(eventDate);
    return `Certain details for the event scheduled on ${formatedEventDate}, 
            in which you are participating, have been updated`;
  }
  buildUserHasBeenInvitedToEventMessage(username: string, eventDate: string) {
    const formatedEventDate = formatEventDateAndTime(eventDate);
    return `You have been invited by ${username} to an event on 
            ${formatedEventDate}`;
  }
  buildUserReceivedFriendRequestMessage(username: string) {
    return `You have received a friend request from ${username}`;
  }
  buildUserHasBeenAddedToFriendlistMessage(username: string) {
    return `You are now friend with ${username}`;
  }
  buildTeamsHasBeenGeneratedMessage(eventDate: string) {
    const formatedEventDate = formatEventDateAndTime(eventDate);
    return `Event scheduled on ${formatedEventDate} has reached 
            its required number of participants and teams have been generated`;
  }
  buildTransfertOwnershipMessage(username: string, eventDate: string) {
    const formatedEventDate = formatEventDateAndTime(eventDate);
    return `${username} has transferred to you his ownership rights
           for the event scheduled on ${formatedEventDate}`;
  }
}
