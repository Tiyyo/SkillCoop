import { Controller, Get, HttpCode, Query } from '@nestjs/common';
import { GetEvalByEventDTO } from 'src/application/dto/get-eval-event.dto';
import { GetProfileEventSkillsUsecases } from 'src/application/usecases/skills/get-eval-event.usecases';

@Controller('skills')
export class GetEvaluationByEventSkillController {
  constructor(
    private readonly getProfileEvalSkillsUsecases: GetProfileEventSkillsUsecases,
  ) { }

  @Get('/event')
  @HttpCode(200)
  async getEvalByEvent(@Query() query: GetEvalByEventDTO) {
    return await this.getProfileEvalSkillsUsecases.getProfileEvaluationByEvent(
      query,
    );
  }
}
