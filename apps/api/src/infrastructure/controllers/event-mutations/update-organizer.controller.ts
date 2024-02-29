import { Body, Controller, HttpCode, Patch, UseGuards } from '@nestjs/common';
import { UpdateEventOrganizerDTO } from 'src/application/dto/update-organizer-event.dto';
import { EventMutationUsecases } from 'src/application/usecases/event-mutation/event-mutation.usecases';
import { OrganizerEventGuard } from 'src/infrastructure/nest/guards/admin-event.guard';

@Controller('event')
export class UpdateOrganizerEventController {
  constructor(private readonly eventMutationUsecases: EventMutationUsecases) {}
  @Patch('/organizer')
  @HttpCode(204)
  @UseGuards(OrganizerEventGuard)
  async updateOrganizer(@Body() body: UpdateEventOrganizerDTO) {
    return await this.eventMutationUsecases.updateOrganizer(body);
  }
}
