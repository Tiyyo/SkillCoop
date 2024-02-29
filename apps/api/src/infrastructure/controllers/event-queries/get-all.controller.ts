import { Controller, Get, HttpCode, Param } from '@nestjs/common';
import { EventQueriesUsecases } from 'src/application/usecases/event-queries/event-queries.usecases';

@Controller('event')
export class GetAllEventController {
  constructor(private readonly eventQueriesUsecases: EventQueriesUsecases) {}
  @Get('user/:profileId')
  @HttpCode(200)
  async getUpcoming(@Param('profileId') profileId: string) {
    return await this.eventQueriesUsecases.getAll(profileId);
  }
}
