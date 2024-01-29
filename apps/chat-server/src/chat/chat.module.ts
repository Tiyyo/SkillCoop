import { Module, Logger } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { HistoricService } from 'src/message-storage/historic.service';
import { MessageStorageModule } from 'src/message-storage/message-storage.module';
import { GroupMessageByService } from 'src/utils/message-groupby.service';

@Module({
  imports: [DatabaseModule, MessageStorageModule],
  providers: [HistoricService, Logger, GroupMessageByService],
})
export class ChatModule { }
