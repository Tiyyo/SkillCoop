import { Logger, Module } from '@nestjs/common';
import databaseProvider from 'src/database/database.client';
import { ConversationService } from './conversation.service';
import { MessageService } from './message.service';
import { HistoricService } from './historic.service';

@Module({
  providers: [
    databaseProvider,
    ConversationService,
    MessageService,
    HistoricService,
    Logger
  ],
  exports: [],
})
export class MessageStorageModule { }
