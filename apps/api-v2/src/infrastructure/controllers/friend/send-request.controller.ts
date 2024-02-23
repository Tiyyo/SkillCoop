import { Body, Controller, Post } from '@nestjs/common';
import { SendRequestDTO } from 'src/application/dto/send-request.dto';
import { FriendUsecases } from 'src/application/usecases/friend/friend.usecases';

@Controller('friends')
export class SendRequestFriendController {
  constructor(private readonly friendUsecases: FriendUsecases) { }
  @Post('')
  async sendRequest(@Body() body: SendRequestDTO) {
    return await this.friendUsecases.sendRequst(body.adder_id, body.friend_id);
  }
}
