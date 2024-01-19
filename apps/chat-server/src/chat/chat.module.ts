import { Module, Logger } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { HistoricService } from 'src/message-storage/historic.service';
import { MessageStorageModule } from 'src/message-storage/message-storage.module';

@Module({
  imports: [DatabaseModule, MessageStorageModule],
  providers: [HistoricService, Logger],
})
export class ChatModule { }
