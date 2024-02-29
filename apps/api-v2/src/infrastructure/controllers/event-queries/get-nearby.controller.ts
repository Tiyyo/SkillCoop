import { Controller, Get, HttpCode, Query } from '@nestjs/common';
import { GetEventNearbyDTO } from 'src/application/dto/get-near-event.dto';
import { EventQueriesUsecases } from 'src/application/usecases/event-queries/event-queries.usecases';

@Controller('event')
export class GetNearByEventController {
  constructor(private readonly eventQueriesUsecases: EventQueriesUsecases) {}
  @Get('/near')
  @HttpCode(200)
  async getUpcoming(@Query() query: GetEventNearbyDTO) {
    return await this.eventQueriesUsecases.getNearby(query);
  }
}
