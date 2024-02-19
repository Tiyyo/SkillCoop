import { Module } from '@nestjs/common';
import { ProfileUsecases } from 'src/application/usecases/profile.usecases';
import { CreateOneProfileController } from 'src/infrastructure/controllers/profile/create-one.controller';
import { GetOneProfileController } from 'src/infrastructure/controllers/profile/get-one.controller';
import { SearchProfileController } from 'src/infrastructure/controllers/profile/search.controller';
import { UpdateOneProfileController } from 'src/infrastructure/controllers/profile/update-one.controller';
import { ProfileAdapter } from 'src/infrastructure/kysely/adapters/profile.adapter';
import databaseProvider from 'src/infrastructure/kysely/database.client';

@Module({
  imports: [],
  controllers: [
    CreateOneProfileController,
    UpdateOneProfileController,
    GetOneProfileController,
    SearchProfileController,
  ],
  providers: [ProfileUsecases, ProfileAdapter, databaseProvider],
})
export class ProfileModule { }
