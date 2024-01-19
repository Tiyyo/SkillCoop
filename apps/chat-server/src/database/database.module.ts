import { Global, Module, Logger } from '@nestjs/common';
import databaseProvider from './database.client';

@Global()
@Module({
  providers: [databaseProvider, Logger],
  exports: [databaseProvider],
})
export class DatabaseModule { }
