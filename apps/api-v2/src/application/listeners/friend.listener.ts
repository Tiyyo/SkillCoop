import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { AddedFriendNotificationService } from 'src/domain/services/notification/subtype/added-friend.notification.service';
import { FriendRequestNotificationService } from 'src/domain/services/notification/subtype/friend-request.notification.service';
import {
  FriendRequestAcceptedEventPayload,
  FriendRequestSentEventPayload,
} from 'src/domain/shared/event-payload.types';

@Injectable()
export class FriendListener {
  constructor(
    private readonly addedFriendService: AddedFriendNotificationService,
    private readonly friendRequestService: FriendRequestNotificationService,
  ) { }
  @OnEvent('friend.request.sent')
  handleFriendRequestSent(data: FriendRequestSentEventPayload) {
    this.friendRequestService.notify(data.profileId, data.instigatorId);
  }
  @OnEvent('friend.request.accepted')
  handleFriendRequestAccepted(data: FriendRequestAcceptedEventPayload) {
    this.addedFriendService.notify(data.profileId, data.instigatorId);
  }
}
