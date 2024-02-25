import { Body, Controller, HttpCode, Patch, UseGuards } from '@nestjs/common';
import { UpdateEventDTO } from 'src/application/dto/update-event.dto';
import { EventMutationUsecases } from 'src/application/usecases/event-mutation/event-mutation.usecases';
import { OrganizerEventGuard } from 'src/infrastructure/nest/guards/admin-event.guard';

@Controller('event')
export class UpdateEventController {
  constructor(private readonly eventMutationUsecases: EventMutationUsecases) { }

  @Patch()
  @HttpCode(204)
  @UseGuards(OrganizerEventGuard)
  async createOne(@Body() body: UpdateEventDTO) {
    return this.eventMutationUsecases.updateOne(body);
  }
}
