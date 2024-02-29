import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CreatePlaygroundDTO } from 'src/application/dto/create-playground.dto';
import { PlaygroundUsecases } from 'src/application/usecases/playground/playground.usecases';

@Controller('playground')
export class CreatePlaygroundController {
  constructor(private readonly playgroundUsecases: PlaygroundUsecases) {}

  @Post()
  @HttpCode(201)
  async createOne(@Body() body: CreatePlaygroundDTO) {
    return await this.playgroundUsecases.createOne(body);
  }
}
