import { Injectable } from '@nestjs/common';
import { EvaluationSkills, Skills } from 'src/domain/entities/skill.entity';

@Injectable()
export class EvaluationService {
  constructor() { }
  average(skill: EvaluationSkills | Skills) {
    const values = Object.values(skill);
    const avg = values.reduce((a: number, b: number) => a + b) / values.length;
    return Math.floor(avg);
  }
}
