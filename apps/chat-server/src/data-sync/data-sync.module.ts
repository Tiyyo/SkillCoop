import { Module } from '@nestjs/common';
import { UserSyncService } from './user-sync.service';
import databaseProvider from 'src/database/database.client';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [UserSyncService, databaseProvider],
  exports: [UserSyncService],
})
export class DataSyncModule { }
