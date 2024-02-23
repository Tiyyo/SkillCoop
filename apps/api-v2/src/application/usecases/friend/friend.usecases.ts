import { BadRequestException, Injectable } from '@nestjs/common';
import { ResponseFriendRequestDTO } from 'src/application/dto/response-friend-request.dto';
import { SearchFriendsDTO } from 'src/application/dto/search-friends.dto';
import { ApplicationException } from 'src/application/exceptions/application.exception';
import { PendingFriendRequestService } from 'src/domain/services/friend/pending-request.service';
import { SendFriendRequestService } from 'src/domain/services/friend/send-request.service';
import { FriendAdapter } from 'src/infrastructure/kysely/adapters/friend.adapter';

@Injectable()
export class FriendUsecases {
  constructor(
    private readonly friendAdapter: FriendAdapter,
    private readonly sendFriendRequestService: SendFriendRequestService,
    private readonly pendingFriendRequestService: PendingFriendRequestService,
  ) { }

  async sendRequst(adderId: string, friendId: string) {
    await this.sendFriendRequestService.execute(adderId, friendId);
    // Notify user received friend request
  }
  async respondToRequest(data: ResponseFriendRequestDTO) {
    const isExist = await this.pendingFriendRequestService.isExist(
      data.adder_id,
      data.friend_id,
    );
    if (!isExist) {
      throw new ApplicationException(
        'No pending request found',
        'FriendUsecases',
      );
    }
    await this.friendAdapter.updateStatus(
      data.adder_id,
      data.friend_id,
      data.status_name,
    );

    if (data.status_name === 'confirmed') {
      // Notify user has been added to friendlist
    }
    return { success: true, username: data.username, status: data.status_name };
  }
  async getFriends(profileId: string) {
    return await this.friendAdapter.findFriends(profileId);
  }
  async getPotentialFriends(profileId: string) {
    return await this.friendAdapter.getSuggestedFriends(profileId);
  }
  async searchFriend(query: SearchFriendsDTO) {
    if (query.username === undefined || typeof query.username !== 'string') {
      throw new BadRequestException('Invalid search query parameter');
    }
    return await this.friendAdapter.searchFriends(
      query.profileId,
      query.username,
      query.page,
    );
  }
  async pendingRequests(profileId: string) {
    return await this.friendAdapter.findPendingRequests(profileId);
  }
}
