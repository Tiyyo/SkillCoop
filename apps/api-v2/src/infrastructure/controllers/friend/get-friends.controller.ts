import { Controller, Get, Param } from '@nestjs/common';
import { FriendUsecases } from 'src/application/usecases/friend/friend.usecases';

@Controller('friends')
export class GetFriendsFriendController {
  constructor(private readonly friendUsecases: FriendUsecases) { }
  @Get('/:profileId')
  async getFriends(@Param('profiledId') profileId: string) {
    return await this.friendUsecases.getFriends(profileId);
  }
}
