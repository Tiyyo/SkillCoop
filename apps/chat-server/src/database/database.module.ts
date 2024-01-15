import { Global, Module } from '@nestjs/common';
import databaseProvider from './database.client';

@Global()
@Module({
  providers: [databaseProvider],
  exports: [databaseProvider],
})
export class DatabaseModule { }
