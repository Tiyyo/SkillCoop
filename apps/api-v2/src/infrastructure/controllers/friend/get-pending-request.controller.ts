import { Controller, Get, Param } from '@nestjs/common';
import { FriendUsecases } from 'src/application/usecases/friend/friend.usecases';

@Controller('friends')
export class GetPendingRequestFriendController {
  constructor(private readonly friendUsecases: FriendUsecases) {}
  @Get('/pending/:profileId')
  async getPendingRequest(@Param('profileId') profileId: string) {
    return await this.friendUsecases.pendingRequests(profileId);
  }
}
