import { Controller, Get, Param } from '@nestjs/common';
import { ProfileIdDTO } from 'src/application/dto/profileId.dto';
import { FriendUsecases } from 'src/application/usecases/friend/friend.usecases';

@Controller('friends')
export class GetPotentialProfileFriendController {
  constructor(private readonly friendUsecases: FriendUsecases) {}
  @Get('/suggest/:profileId')
  async getPotential(@Param() param: ProfileIdDTO) {
    return await this.friendUsecases.getPotentialFriends(param.profileId);
  }
}
