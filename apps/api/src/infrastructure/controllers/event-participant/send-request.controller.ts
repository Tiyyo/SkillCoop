import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { SendRequestEventDTO } from 'src/application/dto/send-request-event.dto';
import { EventParticipantUseCases } from 'src/application/usecases/event-participant/event-participant.usecases';

@Controller('event-participant')
export class SendRequestEventParticipantController {
  constructor(
    private readonly eventParticipantusecases: EventParticipantUseCases,
  ) {}
  @Post('request')
  @HttpCode(201)
  async sendRequest(@Body() body: SendRequestEventDTO) {
    return this.eventParticipantusecases.sendRequest(body);
  }
}
