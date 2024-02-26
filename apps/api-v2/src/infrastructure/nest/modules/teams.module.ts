import { Module } from '@nestjs/common';
import { TeamsUsecases } from 'src/application/usecases/teams/teams.usecases';
import { BuildConfigTeamService } from 'src/domain/services/generate-teams/build-config-team.service';
import { GenerateTeamService } from 'src/domain/services/generate-teams/generate-team.service';
import { TeamEvaluationComputeService } from 'src/domain/services/generate-teams/team-evaluation.service';
import { ComputeUserEvaluationService } from 'src/domain/services/skills/compute-user-evaluation.service';
import { EvaluationService } from 'src/domain/services/skills/evaluation.service';
import { GenerateTeamController } from 'src/infrastructure/controllers/teams/generate-team.controller';
import { EventParticipantAdapter } from 'src/infrastructure/kysely/adapters/event-participant.adapter';
import { EventQueriesAdapter } from 'src/infrastructure/kysely/adapters/event.queries.adapter';
import { SkillsAdapter } from 'src/infrastructure/kysely/adapters/skills.adapter';
import databaseProvider from 'src/infrastructure/kysely/database.client';
import { EventEmitterService } from 'src/infrastructure/service/event.emitter.service';

@Module({
  controllers: [GenerateTeamController],
  providers: [
    databaseProvider,
    TeamsUsecases,
    GenerateTeamService,
    BuildConfigTeamService,
    EventParticipantAdapter,
    TeamEvaluationComputeService,
    ComputeUserEvaluationService,
    EvaluationService,
    { provide: 'EmitEventService', useClass: EventEmitterService },
    EventQueriesAdapter,
    SkillsAdapter,
  ],
})
export class TeamsModule { }
