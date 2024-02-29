import { Body, Controller, HttpCode, Patch } from '@nestjs/common';
import { UpdateParticipantStatusDTO } from 'src/application/dto/update-status.dto';
import { EventParticipantUseCases } from 'src/application/usecases/event-participant/event-participant.usecases';

@Controller('event-participant')
export class UpdateStatusEventParticipantController {
  constructor(
    private readonly eventParticipantUsecases: EventParticipantUseCases,
  ) {}

  @Patch()
  @HttpCode(200)
  async update(@Body() body: UpdateParticipantStatusDTO) {
    return await this.eventParticipantUsecases.updateStatus(body);
  }
}
