import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { DatabaseModule } from 'src/database/database.module';
import { UserModel } from 'src/database/user.service';
import { MessageQueueController } from './message-queue.controller';
import { messageQueueConfig } from './rabbitmq.config';
import { UserQueueService } from 'src/message-queue/create-user.queue.service';

@Module({
  imports: [ClientsModule.register(messageQueueConfig)],
  controllers: [MessageQueueController],
  providers: [UserQueueService, DatabaseModule, UserModel],
  exports: [UserQueueService, UserModel],
})
export class MessageQueueModule { }
