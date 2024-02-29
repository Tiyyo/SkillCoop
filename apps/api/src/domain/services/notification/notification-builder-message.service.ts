import { Injectable } from '@nestjs/common';
import { formatEventDateAndTime } from '@skillcoop/date-handler';
import { ApplicationException } from 'src/application/exceptions/application.exception';

export type NotificationSubtype =
  | 'eventInfosHasBeenUpdated'
  | 'userHasBeenInvitedToEvent'
  | 'userReceivedFriendRequest'
  | 'userHasBeenAddedToFriendlist'
  | 'teamHasBeenGenerated'
  | 'transfertOwnership';

@Injectable()
export class NotificationBuilderMessageService {
  constructor() {}
  build({
    subtype,
    username,
    eventDate,
  }: {
    subtype: NotificationSubtype;
    username: string | undefined;
    eventDate: string | undefined;
  }) {
    switch (subtype) {
      case 'eventInfosHasBeenUpdated':
        if (!eventDate) {
          throw new ApplicationException(
            'Event date is required',
            'NotificationBuilderMessageService',
          );
        }
        return this.buildEventInfosHasBeenUpdatedMessage(eventDate);
      case 'userHasBeenInvitedToEvent':
        if (!eventDate || !username)
          throw new ApplicationException(
            'Event date and username are required',
            'NotificationBuilderMessageService',
          );
        return this.buildUserHasBeenInvitedToEventMessage(username, eventDate);
      case 'userReceivedFriendRequest':
        if (!username)
          throw new ApplicationException(
            'Username is required',
            'NotificationBuilderMessageService',
          );
        return this.buildUserReceivedFriendRequestMessage(username);
      case 'userHasBeenAddedToFriendlist':
        if (!username)
          throw new ApplicationException(
            'Username is required',
            'NotificationBuilderMessageService',
          );
        return this.buildUserHasBeenAddedToFriendlistMessage(username);
      case 'teamHasBeenGenerated':
        if (!eventDate)
          throw new ApplicationException(
            'Event date is required',
            'NotificationBuilderMessageService',
          );
        return this.buildTeamsHasBeenGeneratedMessage(eventDate);
      case 'transfertOwnership':
        if (!eventDate || !username)
          throw new ApplicationException(
            'Event date and username are required',
            'NotificationBuilderMessageService',
          );
        return this.buildTransfertOwnershipMessage(username, eventDate);
      default:
        throw new ApplicationException(
          'Notifcation subtype not implemented',
          'NotificationBuilderMessageService',
        );
        break;
    }
  }
  private buildEventInfosHasBeenUpdatedMessage(eventDate: string) {
    const formatedEventDate = formatEventDateAndTime(eventDate);
    return `Certain details for the event scheduled on ${formatedEventDate},
            in which you are participating, have been updated`;
  }
  private buildUserHasBeenInvitedToEventMessage(
    username: string,
    eventDate: string,
  ) {
    const formatedEventDate = formatEventDateAndTime(eventDate);
    return `You have been invited by ${username} to an event on
            ${formatedEventDate}`;
  }
  private buildUserReceivedFriendRequestMessage(username: string) {
    return `You have received a friend request from ${username}`;
  }
  private buildUserHasBeenAddedToFriendlistMessage(username: string) {
    return `You are now friend with ${username}`;
  }
  private buildTeamsHasBeenGeneratedMessage(eventDate: string) {
    const formatedEventDate = formatEventDateAndTime(eventDate);
    return `Event scheduled on ${formatedEventDate} has reached
            its required number of participants and teams have been generated`;
  }
  private buildTransfertOwnershipMessage(username: string, eventDate: string) {
    const formatedEventDate = formatEventDateAndTime(eventDate);
    return `${username} has transferred to you his ownership rights
           for the event scheduled on ${formatedEventDate}`;
  }
}
