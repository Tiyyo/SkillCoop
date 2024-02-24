import { Module } from '@nestjs/common';
import { EventMutationUsecases } from 'src/application/usecases/event-mutation/event-mutation.usecases';
import { ScoreAdapter } from 'src/domain/repositories/score.repository';
import { EventParticipantService } from 'src/domain/services/event-participant/event-participant.service';
import { EventStatusAdjusterService } from 'src/domain/services/event/event-status-adjuster.service';
import { CreateEventController } from 'src/infrastructure/controllers/event-mutations/create-one.controller';
import { DeleteEventController } from 'src/infrastructure/controllers/event-mutations/delete-one.controller';
import { SaveScoreEventController } from 'src/infrastructure/controllers/event-mutations/save-score.controller';
import { UpdateEventController } from 'src/infrastructure/controllers/event-mutations/update-one.controller';
import { EventParticipantAdapter } from 'src/infrastructure/kysely/adapters/event-participant.adapter';
import { EventMutationsAdapter } from 'src/infrastructure/kysely/adapters/event.mutations.adapter';
import databaseProvider from 'src/infrastructure/kysely/database.client';

@Module({
  controllers: [
    SaveScoreEventController,
    UpdateEventController,
    CreateEventController,
    DeleteEventController,
  ],
  providers: [
    databaseProvider,
    EventMutationUsecases,
    EventMutationsAdapter,
    EventParticipantAdapter,
    EventParticipantService,
    EventStatusAdjusterService,
    ScoreAdapter,
  ],
})
export class EventMutationsModule { }
