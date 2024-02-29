import { Module } from '@nestjs/common';
import { AwardUseCases } from 'src/application/usecases/award/award.usecases';
import { BestStrikerAwardController } from 'src/infrastructure/controllers/best-striker/best-striker.controller';
import { MvpAwardController } from 'src/infrastructure/controllers/mvp/mvp.controller';
import { BestStrikerAdapter } from 'src/infrastructure/kysely/adapters/best-striker.adapter';
import { EventMutationsAdapter } from 'src/infrastructure/kysely/adapters/event.mutations.adapter';
import { EventQueriesAdapter } from 'src/infrastructure/kysely/adapters/event.queries.adapter';
import { MvpAdapter } from 'src/infrastructure/kysely/adapters/mvp.adapter';
import databaseProvider from 'src/infrastructure/kysely/database.client';

@Module({
  controllers: [BestStrikerAwardController, MvpAwardController],
  providers: [
    databaseProvider,
    AwardUseCases,
    EventQueriesAdapter,
    EventMutationsAdapter,
    BestStrikerAdapter,
    MvpAdapter,
  ],
})
export class AwardModule {}
