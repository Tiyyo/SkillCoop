import { Module } from '@nestjs/common';
import { EventMutationUsecases } from 'src/application/usecases/event-mutation/event-mutation.usecases';
import { ScoreAdapter } from 'src/domain/repositories/score.repository';
import { SaveScoreEventController } from 'src/infrastructure/controllers/event-mutations/save-score.controller';
import { EventMutationsAdapter } from 'src/infrastructure/kysely/adapters/event.mutations.adapter';
import databaseProvider from 'src/infrastructure/kysely/database.client';

@Module({
  controllers: [SaveScoreEventController],
  providers: [
    databaseProvider,
    EventMutationUsecases,
    EventMutationsAdapter,
    ScoreAdapter,
  ],
})
export class EventMutationsModule { }
