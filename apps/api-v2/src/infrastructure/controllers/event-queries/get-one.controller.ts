import { Controller, Get, HttpCode, Param } from '@nestjs/common';
import { GetOneEventDTO } from 'src/application/dto/get-one.dto';
import { EventQueriesUsecases } from 'src/application/usecases/event-queries/event-queries.usecases';

@Controller('event')
export class GetOneEventController {
  constructor(private readonly eventQueriesUsecases: EventQueriesUsecases) { }
  @Get('/details/:eventId/:profileId')
  @HttpCode(200)
  async getOneEvent(@Param() params: GetOneEventDTO) {
    return await this.eventQueriesUsecases.getOne(
      params.eventId,
      params.profileId,
    );
  }
}
