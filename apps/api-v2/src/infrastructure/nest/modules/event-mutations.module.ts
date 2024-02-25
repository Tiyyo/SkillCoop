import { Module } from '@nestjs/common';
import { EventMutationUsecases } from 'src/application/usecases/event-mutation/event-mutation.usecases';
import { ScoreAdapter } from 'src/domain/repositories/score.repository';
import { EventParticipantService } from 'src/domain/services/event-participant/event-participant.service';
import { EventStatusAdjusterService } from 'src/domain/services/event/event-status-adjuster.service';
import { BuildConfigTeamService } from 'src/domain/services/generate-teams/build-config-team.service';
import { GenerateTeamService } from 'src/domain/services/generate-teams/generate-team.service';
import { TeamEvaluationComputeService } from 'src/domain/services/generate-teams/team-evaluation.service';
import { ComputeUserEvaluationService } from 'src/domain/services/skills/compute-user-evaluation.service';
import { EvaluationService } from 'src/domain/services/skills/evaluation.service';
import { CreateEventController } from 'src/infrastructure/controllers/event-mutations/create-one.controller';
import { DeleteEventController } from 'src/infrastructure/controllers/event-mutations/delete-one.controller';
import { SaveScoreEventController } from 'src/infrastructure/controllers/event-mutations/save-score.controller';
import { UpdateEventController } from 'src/infrastructure/controllers/event-mutations/update-one.controller';
import { UpdateOrganizerEventController } from 'src/infrastructure/controllers/event-mutations/update-organizer.controller';
import { EventParticipantAdapter } from 'src/infrastructure/kysely/adapters/event-participant.adapter';
import { EventMutationsAdapter } from 'src/infrastructure/kysely/adapters/event.mutations.adapter';
import { EventQueriesAdapter } from 'src/infrastructure/kysely/adapters/event.queries.adapter';
import { SkillsAdapter } from 'src/infrastructure/kysely/adapters/skills.adapter';
import databaseProvider from 'src/infrastructure/kysely/database.client';

@Module({
  controllers: [
    SaveScoreEventController,
    UpdateEventController,
    CreateEventController,
    DeleteEventController,
    UpdateOrganizerEventController,
  ],
  providers: [
    databaseProvider,
    EventMutationUsecases,
    EventMutationsAdapter,
    EventParticipantAdapter,
    EventParticipantService,
    EventStatusAdjusterService,
    GenerateTeamService,
    BuildConfigTeamService,
    TeamEvaluationComputeService,
    ComputeUserEvaluationService,
    EvaluationService,
    EventQueriesAdapter,
    SkillsAdapter,
    ScoreAdapter,
  ],
})
export class EventMutationsModule { }
