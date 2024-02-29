import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CreateOwnRatingDTO } from 'src/application/dto/create-own-rating.dto';
import { CreateSkillsUsecases } from 'src/application/usecases/skills/create-skills.usecases';

@Controller('skills')
export class CreateOwnEvaluationSkillController {
  constructor(private readonly createSkillsUsecases: CreateSkillsUsecases) {}
  @Post()
  @HttpCode(201)
  async create(@Body() body: CreateOwnRatingDTO) {
    return await this.createSkillsUsecases.createOwnRating(body);
  }
}
