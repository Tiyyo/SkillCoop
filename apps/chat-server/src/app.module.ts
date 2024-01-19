import { Module } from '@nestjs/common';
// import { AppService } from './app.service';
// import { MessageService } from './message-test/message.service';
import { ChatModule } from './chat/chat.module';
import { ChatGateway } from './chat/chat.gateway';
import { DatabaseModule } from './database/database.module';
// import { UserModel } from './database/user.service';
// import { UserQueueService } from './message-queue/create-user.queue.service';
import { MessageQueueModule } from './broker/message-queue.module';
import { AppController } from './app.controller';
import { MessageStorageModule } from './message-storage/message-storage.module';
import { ConversationService } from './message-storage/conversation.service';
import { HistoricService } from './message-storage/historic.service';
import { MessageService } from './message-storage/message.service';

@Module({
  imports: [
    ChatModule,
    DatabaseModule,
    MessageQueueModule,
    MessageStorageModule,
  ],
  controllers: [AppController],
  providers: [
    // AppService,
    // MessageService,
    ChatGateway,
    ConversationService,
    HistoricService,
    MessageService,
    // UserModel,
    // UserQueueService,
  ],
})
export class AppModule { }
