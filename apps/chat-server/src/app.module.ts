import { Module, Logger } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';
import { ChatGateway } from './chat/chat.gateway';
import { DatabaseModule } from './database/database.module';
import { MessageQueueModule } from './broker/message-queue.module';
import { AppController } from './app.controller';
import { MessageStorageModule } from './message-storage/message-storage.module';
import { ConversationService } from './message-storage/conversation.service';
import { HistoricService } from './message-storage/historic.service';
import { MessageService } from './message-storage/message.service';
import { GroupMessageByService } from './utils/message-groupby.service';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ChatModule,
    DatabaseModule,
    MessageQueueModule,
    MessageStorageModule,
    ConfigModule.forRoot({
    
  ],
  controllers: [AppController],
  providers: [
    ChatGateway,
    ConversationService,
    HistoricService,
    MessageService,
    GroupMessageByService,
    Logger,
  ],
})
export class AppModule { }
