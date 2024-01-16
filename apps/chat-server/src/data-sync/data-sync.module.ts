import { Module } from '@nestjs/common';
import { UserSyncService } from './user-sync.service';
import { EventSyncService } from './event-sync.service';
import { ParticipantSyncService } from './participant-sync.service';
import databaseProvider from 'src/database/database.client';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [
    UserSyncService,
    databaseProvider,
    EventSyncService,
    ParticipantSyncService,
  ],
  exports: [UserSyncService, EventSyncService, ParticipantSyncService],
})
export class DataSyncModule { }
