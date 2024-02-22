import { Controller, Get, HttpCode, Param } from '@nestjs/common';
import { PlaygroundUsecases } from 'src/application/usecases/playground/playground.usecases';

@Controller('playground')
export class SearchPlaygroundController {
  constructor(private readonly playgroundUsecases: PlaygroundUsecases) { }

  @Get()
  @HttpCode(200)
  async search(@Param('query') query: string) {
    const playgrounds = await this.playgroundUsecases.search(query);
    if (!playgrounds) {
      return { error: 'playground not found' };
    }
    return playgrounds;
  }
}
