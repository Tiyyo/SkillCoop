import { Body, Controller, Patch } from '@nestjs/common';
import { UpdateEventOrganizerDTO } from 'src/application/dto/update-organizer-event.dto';
import { EventMutationUsecases } from 'src/application/usecases/event-mutation/event-mutation.usecases';

@Controller('event')
export class UpdateOrganizerEventController {
  constructor(private readonly eventMutationUsecases: EventMutationUsecases) { }
  @Patch('/organizer')
  async updateOrganizer(@Body() body: UpdateEventOrganizerDTO) {
    return await this.eventMutationUsecases.updateOrganizer(body);
  }
}
