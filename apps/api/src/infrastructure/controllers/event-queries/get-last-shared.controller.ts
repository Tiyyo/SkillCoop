import { Controller, Get, HttpCode, Param } from '@nestjs/common';
import { GetLastSharedDTO } from 'src/application/dto/get-last-shared.dto';
import { EventQueriesUsecases } from 'src/application/usecases/event-queries/event-queries.usecases';

@Controller('event')
export class GetLastSharedEventController {
  constructor(private readonly eventQueriesUsecases: EventQueriesUsecases) {}
  @Get('/shared/:profileId/:friendId')
  @HttpCode(200)
  async getUpcoming(@Param() param: GetLastSharedDTO) {
    return await this.eventQueriesUsecases.getLastShared(param);
  }
}
