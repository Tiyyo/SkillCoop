import { Controller, Delete, HttpCode, Param } from '@nestjs/common';
import { DeleteEventDTO } from 'src/application/dto/delete-event.dto';
import { EventMutationUsecases } from 'src/application/usecases/event-mutation/event-mutation.usecases';

@Controller('event')
export class DeleteEventController {
  constructor(private readonly eventMutationUsecases: EventMutationUsecases) { }
  @Delete('/:eventId/:profileId')
  @HttpCode(204)
  async deleteOne(@Param() param: DeleteEventDTO) {
    return this.eventMutationUsecases.deleteOne(param);
  }
}
