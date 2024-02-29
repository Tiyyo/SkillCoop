import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { SendInvitationEventDTO } from 'src/application/dto/send-invitation-event.dto';
import { EventParticipantUseCases } from 'src/application/usecases/event-participant/event-participant.usecases';

@Controller('event-participant')
export class SendInvitationEventParticipantController {
  constructor(
    private readonly eventParticipantUsecases: EventParticipantUseCases,
  ) {}
  @Post()
  @HttpCode(201)
  async sendInvitation(@Body() body: SendInvitationEventDTO) {
    return await this.eventParticipantUsecases.sendInvitation(body);
  }
}
