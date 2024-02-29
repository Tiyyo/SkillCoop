import { Body, Controller, HttpCode, Patch, UseGuards } from '@nestjs/common';
import { UpdateEventDTO } from 'src/application/dto/update-event.dto';
import { EventMutationUsecases } from 'src/application/usecases/event-mutation/event-mutation.usecases';
import { OrganizerEventGuard } from 'src/infrastructure/nest/guards/admin-event.guard';

@Controller('event')
export class UpdateEventController {
  constructor(private readonly eventMutationUsecases: EventMutationUsecases) {}

  @Patch()
  @HttpCode(200)
  @UseGuards(OrganizerEventGuard)
  async updateOne(@Body() body: UpdateEventDTO) {
    return await this.eventMutationUsecases.updateOne(body);
  }
}
