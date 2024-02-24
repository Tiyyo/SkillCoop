import { Body, Controller, HttpCode, Patch } from '@nestjs/common';
import { UpdateEventDTO } from 'src/application/dto/update-event.dto';
import { EventMutationUsecases } from 'src/application/usecases/event-mutation/event-mutation.usecases';

@Controller('event')
export class UpdateEventController {
  constructor(private readonly eventMutationUsecases: EventMutationUsecases) { }

  @Patch()
  @HttpCode(204)
  async createOne(@Body() body: UpdateEventDTO) {
    return this.eventMutationUsecases.updateOne(body);
  }
}
