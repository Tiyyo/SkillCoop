import { Module } from '@nestjs/common';
// import { AppService } from './app.service';
import { MessageService } from './message/message.service';
import { ChatModule } from './chat/chat.module';
import { ChatGateway } from './chat/chat.gateway';
import { DatabaseModule } from './database/database.module';
// import { UserModel } from './database/user.service';
// import { UserQueueService } from './message-queue/create-user.queue.service';
import { MessageQueueModule } from './broker/message-queue.module';

@Module({
  imports: [ChatModule, DatabaseModule, MessageQueueModule],
  controllers: [],
  providers: [
    // AppService,
    MessageService,
    ChatGateway,
    // UserModel,
    // UserQueueService,
  ],
})
export class AppModule { }
