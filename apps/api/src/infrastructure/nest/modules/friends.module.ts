import { Module } from '@nestjs/common';
import { FriendUsecases } from 'src/application/usecases/friend/friend.usecases';
import { PendingFriendRequestService } from 'src/domain/services/friend/pending-request.service';
import { SendFriendRequestService } from 'src/domain/services/friend/send-request.service';
import { GetFriendsFriendController } from 'src/infrastructure/controllers/friend/get-friends.controller';
import { GetPendingRequestFriendController } from 'src/infrastructure/controllers/friend/get-pending-request.controller';
import { GetPotentialProfileFriendController } from 'src/infrastructure/controllers/friend/get-potential-profile.controller';
import { ResponseRequestFriendController } from 'src/infrastructure/controllers/friend/response-request.controller';
import { SearchFriendController } from 'src/infrastructure/controllers/friend/search-friends.controller';
import { SendRequestFriendController } from 'src/infrastructure/controllers/friend/send-request.controller';
import { FriendAdapter } from 'src/infrastructure/kysely/adapters/friend.adapter';
import databaseProvider from 'src/infrastructure/kysely/database.client';
import { EventEmitterService } from 'src/infrastructure/service/event.emitter.service';

@Module({
  controllers: [
    SearchFriendController,
    GetFriendsFriendController,
    SendRequestFriendController,
    ResponseRequestFriendController,
    GetPendingRequestFriendController,
    GetPotentialProfileFriendController,
  ],
  providers: [
    databaseProvider,
    FriendAdapter,
    FriendUsecases,
    SendFriendRequestService,
    PendingFriendRequestService,
    { provide: 'EmitEventService', useClass: EventEmitterService },
  ],
})
export class FriendModule {}
