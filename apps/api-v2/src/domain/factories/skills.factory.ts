import { Injectable } from '@nestjs/common';
import { SkillEntity } from '../entities/skill.entity';
import { SkillService } from '../services/skills/skill.service';

@Injectable()
export class SkillsFactory {
  constructor(private readonly skillService: SkillService) {}
  public create(data) {
    return new SkillEntity({
      pace:
        typeof data.pace === 'string'
          ? this.skillService.associateStringToNumber(data.pace)
          : data.pace,
      shooting:
        typeof data.shooting === 'string'
          ? this.skillService.associateStringToNumber(data.shooting)
          : data.shooting,
      passing:
        typeof data.passing === 'string'
          ? this.skillService.associateStringToNumber(data.passing)
          : data.passing,
      dribbling:
        typeof data.dribbling === 'string'
          ? this.skillService.associateStringToNumber(data.dribbling)
          : data.dribbling,
      defending:
        typeof data.defending === 'string'
          ? this.skillService.associateStringToNumber(data.defending)
          : data.defending,
      rater_id: data.rater_id,
      reviewee_id: data.reviewee_id,
      event_id: data.event_id,
    });
  }
  public createOwnRating(data) {
    const creationData = {
      ...data,
      reviewee_id: data.profile_id,
      rater_id: data.profile_id,
    };
    return this.create(creationData);
  }
}
