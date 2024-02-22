import { Injectable } from '@nestjs/common';
import { GetEvalByEventDTO } from 'src/application/dto/get-eval-event.dto';
import { EvaluationService } from 'src/domain/services/skills/evaluation.service';
import { SkillsAdapter } from 'src/infrastructure/kysely/adapters/skills.adapter';

@Injectable()
export class GetProfileEventSkillsUsecases {
  constructor(
    private readonly skillsAdapter: SkillsAdapter,
    private readonly evaluationService: EvaluationService,
  ) { }
  async getProfileEvaluationByEvent(query: GetEvalByEventDTO) {
    const skill = await this.skillsAdapter.findOne({
      rater_id: query.rater_id,
      reviewee_id: query.reviewee_id,
      event_id: query.event_id,
    });
    if (!skill) {
      return { rating: null };
    }
    return { rating: this.evaluationService.average(skill) };
  }
}
