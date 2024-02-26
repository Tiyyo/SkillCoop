import { Module } from '@nestjs/common';
import { RandomGenerationService } from 'src/application/services/random.service';
import { ProfileUsecases } from 'src/application/usecases/profile/profile.usecases';
import { UpdateImageProfileUsecases } from 'src/application/usecases/profile/update-image.usecases';
import { ImageService } from 'src/domain/services/image/image.service';
import { BuildProfileService } from 'src/domain/services/profile/find-profile.service';
import { CreateOneProfileController } from 'src/infrastructure/controllers/profile/create-one.controller';
import { GetOneProfileController } from 'src/infrastructure/controllers/profile/get-one.controller';
import { SearchProfileController } from 'src/infrastructure/controllers/profile/search.controller';
import { UpdateImageController } from 'src/infrastructure/controllers/profile/update-image';
import { UpdateOneProfileController } from 'src/infrastructure/controllers/profile/update-one.controller';
import { EventParticipantAdapter } from 'src/infrastructure/kysely/adapters/event-participant.adapter';
import { EventQueriesAdapter } from 'src/infrastructure/kysely/adapters/event.queries.adapter';
import { ImageAdapter } from 'src/infrastructure/kysely/adapters/image.adapter';
import { ProfileAdapter } from 'src/infrastructure/kysely/adapters/profile.adapter';
import databaseProvider from 'src/infrastructure/kysely/database.client';
import { UploadAWSService } from 'src/infrastructure/s3/upload-aws.service';
import { NestEnvVariableAdapterService } from 'src/infrastructure/service/env.adapter.service';
import { EventEmitterService } from 'src/infrastructure/service/event.emitter.service';

@Module({
  imports: [],
  controllers: [
    CreateOneProfileController,
    UpdateOneProfileController,
    GetOneProfileController,
    SearchProfileController,
    UpdateImageController,
  ],
  providers: [
    ProfileUsecases,
    UpdateImageProfileUsecases,
    { provide: 'UploadService', useClass: UploadAWSService },
    { provide: 'EmitEventService', useClass: EventEmitterService },
    NestEnvVariableAdapterService,
    RandomGenerationService,
    EventParticipantAdapter,
    EventQueriesAdapter,
    ProfileAdapter,
    ImageAdapter,
    databaseProvider,
    ImageService,

    BuildProfileService,
  ],
})
export class ProfileModule { }
