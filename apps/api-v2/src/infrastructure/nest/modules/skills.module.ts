import { Module } from '@nestjs/common';
import { CreateSkillsUsecases } from 'src/application/usecases/skills/create-skills.usecases';
import { GetProfileEventSkillsUsecases } from 'src/application/usecases/skills/get-eval-event.usecases';
import { GetUserSkillsUsecases } from 'src/application/usecases/skills/get-user-eval.usecases';
import { SkillsFactory } from 'src/domain/factories/skills.factory';
import { ComputeUserEvaluationService } from 'src/domain/services/skills/compute-user-evaluation.service';
import { EvaluationService } from 'src/domain/services/skills/evaluation.service';
import { SkillService } from 'src/domain/services/skills/skill.service';
import { CreateEvaluationSkillController } from 'src/infrastructure/controllers/skills/create-eval.controller';
import { CreateOwnEvaluationSkillController } from 'src/infrastructure/controllers/skills/create-own-eval.controller';
import { GetEvaluationByEventSkillController } from 'src/infrastructure/controllers/skills/get-eval-by-event.controller';
import { GetProfileEvaluationSkillsController } from 'src/infrastructure/controllers/skills/get-profile-eval.controller';
import { EventQueriesAdapter } from 'src/infrastructure/kysely/adapters/event.queries.adapter';
import { ProfileAdapter } from 'src/infrastructure/kysely/adapters/profile.adapter';
import { SkillsAdapter } from 'src/infrastructure/kysely/adapters/skills.adapter';
import databaseProvider from 'src/infrastructure/kysely/database.client';

@Module({
  controllers: [
    GetProfileEvaluationSkillsController,
    GetEvaluationByEventSkillController,
    CreateEvaluationSkillController,
    CreateOwnEvaluationSkillController,
  ],
  providers: [
    databaseProvider,
    GetUserSkillsUsecases,
    CreateSkillsUsecases,
    GetProfileEventSkillsUsecases,
    SkillsAdapter,
    ProfileAdapter,
    EventQueriesAdapter,
    SkillsFactory,
    SkillService,
    EvaluationService,
    ComputeUserEvaluationService,
  ],
})
export class SkillsModule { }
