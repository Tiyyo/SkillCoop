import { Controller, Get, Query } from '@nestjs/common';
import { SearchFriendsDTO } from 'src/application/dto/search-friends.dto';
import { FriendUsecases } from 'src/application/usecases/friend/friend.usecases';

@Controller('friends')
export class SearchFriendController {
  constructor(private readonly friendUsecases: FriendUsecases) {}
  @Get('/search/friendlist')
  async search(@Query() query: SearchFriendsDTO) {
    console.log('query', query);
    return await this.friendUsecases.searchFriend(query);
  }
}
