import { Module, Logger, NestModule, MiddlewareConsumer } from '@nestjs/common';
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
import { AuthMiddleware } from './middleware/auth-middleware';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { UserService } from './user/user.service';


@Module({
  imports: [
    ConfigModule.forRoot(),
    ChatModule,
    DatabaseModule,
    MessageQueueModule,
    MessageStorageModule,
  ],
  controllers: [AppController],
  providers: [
    ChatGateway,
    ConversationService,
    HistoricService,
    MessageService,
    GroupMessageByService,
    Logger,
    JwtService,
    UserService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('chat-service/*');
  }
}
