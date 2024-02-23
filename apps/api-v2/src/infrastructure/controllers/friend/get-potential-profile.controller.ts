import { Controller, Get, Param } from '@nestjs/common';
import { FriendUsecases } from 'src/application/usecases/friend/friend.usecases';

@Controller('friends')
export class GetPotentialProfileFriendController {
  constructor(private readonly friendUsecases: FriendUsecases) { }
  @Get('/suggest/:profileId')
  async getPotential(@Param('profiledId') profileId: string) {
    return await this.friendUsecases.getPotentialFriends(profileId);
  }
}
