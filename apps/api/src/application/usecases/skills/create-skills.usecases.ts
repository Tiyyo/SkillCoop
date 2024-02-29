import { Injectable } from '@nestjs/common';
import { CreateOwnRatingDTO } from 'src/application/dto/create-own-rating.dto';
import { CreateRatingDTO } from 'src/application/dto/create-rating.dto';
import { ApplicationException } from 'src/application/exceptions/application.exception';
import { SkillsFactory } from 'src/domain/factories/skills.factory';
import { SkillsAdapter } from 'src/infrastructure/kysely/adapters/skills.adapter';

@Injectable()
export class CreateSkillsUsecases {
  constructor(
    private readonly skillsAdapter: SkillsAdapter,
    private readonly skillFactory: SkillsFactory,
  ) {}
  async createRating(body: CreateRatingDTO) {
    const isEvalExist = await this.skillsAdapter.findOne({
      rater_id: body.rater_id,
      reviewee_id: body.reviewee_id,
      event_id: body.event_id,
    });
    if (isEvalExist) {
      throw new ApplicationException(
        'You have already evaluated this person',
        'SkillsUsecases',
      );
    }
    const skills = this.skillFactory.create(body);
    return await this.skillsAdapter.createOne(skills);
  }
  async createOwnRating(body: CreateOwnRatingDTO) {
    const isEvalExist = await this.skillsAdapter.findOne({
      rater_id: body.profile_id,
      reviewee_id: body.profile_id,
    });
    if (isEvalExist) {
      throw new ApplicationException(
        'You have already evaluated yourself',
        'SkillsUsecases',
      );
    }
    const skills = this.skillFactory.createOwnRating(body);
    return await this.skillsAdapter.createOne(skills);
  }
}
