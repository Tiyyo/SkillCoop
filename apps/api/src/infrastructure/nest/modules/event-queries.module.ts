import { Module } from '@nestjs/common';
import { EventQueriesUsecases } from 'src/application/usecases/event-queries/event-queries.usecases';
import { GetAllEventController } from 'src/infrastructure/controllers/event-queries/get-all.controller';
import { GetLastSharedEventController } from 'src/infrastructure/controllers/event-queries/get-last-shared.controller';
import { GetNearByEventController } from 'src/infrastructure/controllers/event-queries/get-nearby.controller';
import { GetOneEventController } from 'src/infrastructure/controllers/event-queries/get-one.controller';
import { GetOrganizeEventController } from 'src/infrastructure/controllers/event-queries/get-organize.controller';
import { GetPastsEventController } from 'src/infrastructure/controllers/event-queries/get-pasts.controller';
import { GetUpcomingEventController } from 'src/infrastructure/controllers/event-queries/get-upcomming';
import { EventQueriesAdapter } from 'src/infrastructure/kysely/adapters/event.queries.adapter';
import databaseProvider from 'src/infrastructure/kysely/database.client';

@Module({
  controllers: [
    GetAllEventController,
    GetOneEventController,
    GetOrganizeEventController,
    GetPastsEventController,
    GetUpcomingEventController,
    GetLastSharedEventController,
    GetNearByEventController,
  ],
  providers: [databaseProvider, EventQueriesAdapter, EventQueriesUsecases],
})
export class EventQueriesModule {}
