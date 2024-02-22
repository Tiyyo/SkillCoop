import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CreateRatingDTO } from 'src/application/dto/create-rating.dto';
import { CreateSkillsUsecases } from 'src/application/usecases/skills/create-skills.usecases';

@Controller('skill-foot')
export class CreateEvaluationSkillController {
  constructor(private readonly createSkillsUsecases: CreateSkillsUsecases) { }
  @Post('/event')
  @HttpCode(201)
  async create(@Body() body: CreateRatingDTO) {
    return await this.createSkillsUsecases.createRating(body);
  }
}
