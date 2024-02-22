import { Module } from '@nestjs/common';
import { PlaygroundFactory } from 'src/domain/factories/playground.factory';
import { CreatePlaygroundController } from 'src/infrastructure/controllers/playground/create-one.controller';
import { SearchPlaygroundController } from 'src/infrastructure/controllers/playground/search.controller';
import { PlaygroundAdapter } from 'src/infrastructure/kysely/adapters/playground.adapter';
import databaseProvider from 'src/infrastructure/kysely/database.client';

@Module({
  controllers: [SearchPlaygroundController, CreatePlaygroundController],
  providers: [databaseProvider, PlaygroundAdapter, PlaygroundFactory],
})
export class PlaygroundModule { }
