import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CreateEventDTO } from 'src/application/dto/create-event.dto';
import { EventMutationUsecases } from 'src/application/usecases/event-mutation/event-mutation.usecases';

@Controller('event')
export class CreateEventController {
  constructor(private readonly eventMutationUsecases: EventMutationUsecases) { }

  @Post()
  @HttpCode(201)
  async createOne(@Body() body: CreateEventDTO) {
    return this.eventMutationUsecases.createOne(body);
  }
}
