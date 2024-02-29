import { Injectable } from '@nestjs/common';
import { ApplicationException } from 'src/application/exceptions/application.exception';
import { FriendAdapter } from 'src/infrastructure/kysely/adapters/friend.adapter';

@Injectable()
export class SendFriendRequestService {
  constructor(private readonly friendAdapter: FriendAdapter) {}
  async execute(from: string, to: string) {
    const isRelationExist = await this.friendAdapter.findRelation(from, to);
    if (isRelationExist) {
      throw new ApplicationException(
        'Could not send friend request, relation already exist',
        'SendFriendRequestService',
      );
    }
    await this.friendAdapter.createOne({
      status_name: 'pending',
      adder_id: from,
      friend_id: to,
    });
  }
}
