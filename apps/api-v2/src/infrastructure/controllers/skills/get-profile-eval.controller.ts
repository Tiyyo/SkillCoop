import { Controller, Get, Param } from '@nestjs/common';
import { GetUserSkillsUsecases } from 'src/application/usecases/skills/get-user-eval.usecases';
@Controller('skills')
export class GetProfileEvaluationSkillsController {
  constructor(private readonly getUserSkillsUsecases: GetUserSkillsUsecases) {}

  @Get('profile/:profileId')
  async getProfileEvaluation(@Param('profileId') profileId: string) {
    return await this.getUserSkillsUsecases.getProfileEvaluation(profileId);
  }
}
