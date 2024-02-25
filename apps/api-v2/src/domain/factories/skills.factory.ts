import { Injectable } from '@nestjs/common';
import { SkillEntity } from '../entities/skill.entity';
import { SkillService } from '../services/skills/skill.service';

@Injectable()
export class SkillsFactory {
  constructor(private readonly skillService: SkillService) { }
  public create(data) {
    return new SkillEntity({
      pace: this.skillService.associateStringToNumber(data.pace),
      shooting: this.skillService.associateStringToNumber(data.shooting),
      passing: this.skillService.associateStringToNumber(data.passing),
      dribbling: this.skillService.associateStringToNumber(data.dribbling),
      defending: this.skillService.associateStringToNumber(data.defending),
      rater_id: data.profile_id,
      reviewee_id: data.profile_id,
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
