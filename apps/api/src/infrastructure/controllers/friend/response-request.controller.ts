import { Body, Controller, Patch } from '@nestjs/common';
import { ResponseFriendRequestDTO } from 'src/application/dto/response-friend-request.dto';
import { FriendUsecases } from 'src/application/usecases/friend/friend.usecases';

@Controller('friends')
export class ResponseRequestFriendController {
  constructor(private readonly friendUsecases: FriendUsecases) { }
  @Patch()
  async response(@Body() body: ResponseFriendRequestDTO) {
    return await this.friendUsecases.respondToRequest(body);
  }
}
