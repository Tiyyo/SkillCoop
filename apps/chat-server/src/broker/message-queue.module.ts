import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { DatabaseModule } from 'src/database/database.module';
import { UserModel } from 'src/database/user.service';
import { MessageQueueController } from './message-queue.controller';
import { messageQueueConfig } from './rabbitmq.config';
import { UserQueueService } from 'src/message-queue/create-user.queue.service';
import { UserQueueDispatcher } from './user.queue.dispatcher';
import { DataSyncModule } from 'src/data-sync/data-sync.module';
import { UserSyncService } from 'src/data-sync/user-sync.service';

@Module({
  imports: [ClientsModule.register(messageQueueConfig), DataSyncModule],
  controllers: [MessageQueueController],
  providers: [
    UserQueueService,
    DatabaseModule,
    UserModel,
    UserQueueDispatcher,
    UserSyncService,
  ],
  exports: [UserQueueService, UserModel],
})
export class MessageQueueModule { }
