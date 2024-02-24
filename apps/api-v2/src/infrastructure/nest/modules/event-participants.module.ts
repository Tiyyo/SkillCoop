import { Module } from '@nestjs/common';
import { EventParticipantUseCases } from 'src/application/usecases/event-participant/event-participant.usecases';
import { EventParticipantPendingService } from 'src/domain/services/event-participant/event-participant-pending.service';
import { EventParticipantStatusManagerService } from 'src/domain/services/event-participant/event-participant-status.service';
import { EventParticipantConfirmedService } from 'src/domain/services/event-participant/event-participant.confirmed.service';
import { EventParticipantDeclinedService } from 'src/domain/services/event-participant/event-participant.declined.service';
import { EventParticipantService } from 'src/domain/services/event-participant/event-participant.service';
import { EventStatusEvaluator } from 'src/domain/services/event-participant/event-status-evaluator.service';
import { BuildConfigTeamService } from 'src/domain/services/generate-teams/build-config-team.service';
import { GenerateTeamService } from 'src/domain/services/generate-teams/generate-team.service';
import { TeamEvaluationComputeService } from 'src/domain/services/generate-teams/team-evaluation.service';
import { ComputeUserEvaluationService } from 'src/domain/services/skills/compute-user-evaluation.service';
import { EvaluationService } from 'src/domain/services/skills/evaluation.service';
import { SendInvitationEventParticipantController } from 'src/infrastructure/controllers/event-participant/send-invitation.controller';
import { SendRequestEventParticipantController } from 'src/infrastructure/controllers/event-participant/send-request.controller';
import { UpdateStatusEventParticipantController } from 'src/infrastructure/controllers/event-participant/update-status.controller';
import { EventParticipantAdapter } from 'src/infrastructure/kysely/adapters/event-participant.adapter';
import { EventMutationsAdapter } from 'src/infrastructure/kysely/adapters/event.mutations.adapter';
import { EventQueriesAdapter } from 'src/infrastructure/kysely/adapters/event.queries.adapter';
import { SkillsAdapter } from 'src/infrastructure/kysely/adapters/skills.adapter';
import databaseProvider from 'src/infrastructure/kysely/database.client';

@Module({
  controllers: [
    SendRequestEventParticipantController,
    SendInvitationEventParticipantController,
    UpdateStatusEventParticipantController,
  ],
  providers: [
    databaseProvider,
    EventParticipantUseCases,
    EventParticipantService,
    EventParticipantStatusManagerService,
    EventParticipantConfirmedService,
    EventParticipantDeclinedService,
    EventParticipantPendingService,
    GenerateTeamService,
    BuildConfigTeamService,
    TeamEvaluationComputeService,
    ComputeUserEvaluationService,
    EvaluationService,
    EventStatusEvaluator,
    EventParticipantAdapter,
    EventMutationsAdapter,
    EventQueriesAdapter,
    SkillsAdapter,
  ],
})
export class EventParticipantsModule { }
