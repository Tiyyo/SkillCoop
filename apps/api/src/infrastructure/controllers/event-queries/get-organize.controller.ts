import { Controller, Get, HttpCode, Query } from '@nestjs/common';
import { GetPaginatedEventDTO } from 'src/application/dto/get-paginated-event.dto';
import { EventQueriesUsecases } from 'src/application/usecases/event-queries/event-queries.usecases';

@Controller('event')
export class GetOrganizeEventController {
  constructor(private readonly eventQueriesUsecases: EventQueriesUsecases) {}
  @Get('/organizer')
  @HttpCode(200)
  async getOrganizeEvent(@Query() query: GetPaginatedEventDTO) {
    return await this.eventQueriesUsecases.getOrganize(query);
  }
}
