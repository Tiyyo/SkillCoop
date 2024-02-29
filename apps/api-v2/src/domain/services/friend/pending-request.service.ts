import { Injectable } from '@nestjs/common';
import { FriendAdapter } from 'src/infrastructure/kysely/adapters/friend.adapter';

@Injectable()
export class PendingFriendRequestService {
  constructor(private readonly friendAdapter: FriendAdapter) {}
  async isExist(from: string, to: string) {
    const friend = await this.friendAdapter.findOne({
      adder_id: from,
      friend_id: to,
      status_name: 'pending',
    });
    return !!friend;
  }
}
