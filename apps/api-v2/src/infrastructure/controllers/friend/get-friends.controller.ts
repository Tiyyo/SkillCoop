import { Controller, Get, Param } from '@nestjs/common';
import { ProfileIdDTO } from 'src/application/dto/profileId.dto';
import { FriendUsecases } from 'src/application/usecases/friend/friend.usecases';

@Controller('friends')
export class GetFriendsFriendController {
  constructor(private readonly friendUsecases: FriendUsecases) { }
  @Get('/:profileId')
  async getFriends(@Param() param: ProfileIdDTO) {
    return await this.friendUsecases.getFriends(param.profileId);
  }
}
