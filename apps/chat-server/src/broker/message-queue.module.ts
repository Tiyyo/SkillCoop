import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { DatabaseModule } from 'src/database/database.module';
import { UserModel } from 'src/database/user.service';
import { MessageQueueController } from './message-queue.controller';
import { messageQueueConfig } from './rabbitmq.config';
import { UserQueueDispatcher } from './user.queue.dispatcher';
import { DataSyncModule } from 'src/data-sync/data-sync.module';
import { UserSyncService } from 'src/data-sync/user-sync.service';
import { EventQueueDispatcher } from './event.queue.dispatcher';
import { ParticipantQueueDispatcher } from './participant.queue.dispatcher';

@Module({
  imports: [ClientsModule.register(messageQueueConfig), DataSyncModule],
  controllers: [MessageQueueController],
  providers: [
    DatabaseModule,
    UserModel,
    UserQueueDispatcher,
    EventQueueDispatcher,
    ParticipantQueueDispatcher,
    UserSyncService,
  ],
  exports: [UserModel],
})
export class MessageQueueModule { }
