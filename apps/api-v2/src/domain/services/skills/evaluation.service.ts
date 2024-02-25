import { Injectable } from '@nestjs/common';
import { EvaluationSkills, Skills } from 'src/domain/entities/skill.entity';

const AUTHORIZED_KEYS_SKILLS = [
  'pace',
  'shooting',
  'passing',
  'dribbling',
  'defending',
  'avg_pace',
  'avg_shooting',
  'avg_passing',
  'avg_dribbling',
  'avg_defending',
];

@Injectable()
export class EvaluationService {
  constructor() { }
  average(skill: EvaluationSkills | Skills) {
    if (!skill) return null;
    const values = Object.keys(skill)
      .filter((key) => {
        return AUTHORIZED_KEYS_SKILLS.includes(key);
      })
      .map((key) => {
        return skill[key];
      });
    const avg = values.reduce((a: number, b: number) => a + b) / values.length;
    return Math.floor(avg);
  }
}
