import { Controller, Get, HttpCode, Query } from '@nestjs/common';
import { GetPaginatedEventDTO } from 'src/application/dto/get-paginated-event.dto';
import { EventQueriesUsecases } from 'src/application/usecases/event-queries/event-queries.usecases';

@Controller('event')
export class GetUpcomingEventController {
  constructor(private readonly eventQueriesUsecases: EventQueriesUsecases) {}
  @Get('/upcoming')
  @HttpCode(200)
  async getUpcoming(@Query() query: GetPaginatedEventDTO) {
    return await this.eventQueriesUsecases.getUpcoming(query);
  }
}
