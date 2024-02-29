import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { SaveScoreEventDTO } from 'src/application/dto/save-score.dto';
import { EventMutationUsecases } from 'src/application/usecases/event-mutation/event-mutation.usecases';

@Controller('score')
export class SaveScoreEventController {
  constructor(private readonly eventMutationUsecases: EventMutationUsecases) {}
  @Post()
  @HttpCode(201)
  async save(@Body() body: SaveScoreEventDTO) {
    await this.eventMutationUsecases.saveScore(body);
    return { success: true };
  }
}
