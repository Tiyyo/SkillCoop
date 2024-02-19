import { Global, Module, Logger } from '@nestjs/common';
import databaseProvider from '../../kysely/database.client';

@Global()
@Module({
  providers: [databaseProvider, Logger],
  exports: [databaseProvider],
})
export class DatabaseModule { }
