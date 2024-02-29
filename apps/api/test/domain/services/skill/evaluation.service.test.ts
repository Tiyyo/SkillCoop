import { EvaluationService } from 'src/domain/services/skills/evaluation.service';
import { describe, beforeEach, it, expect } from 'vitest';

describe('EvaluationService', async () => {
  let service: EvaluationService;

  beforeEach(async () => {
    service = new EvaluationService();
  });
  it('should return the average of the skills', async () => {
    const skills = {
      pace: 5,
      defending: 2,
      shooting: 4,
      passing: 5,
      dribbling: 4,
    };
    const result = service.average(skills);
    expect(result).toBe(4);
  });
  it('should return the average of the skills high number', async () => {
    const skills = {
      pace: 150,
      defending: 25,
      shooting: 10,
      passing: 5,
      dribbling: 250,
    };
    const result = service.average(skills);
    expect(result).toBe(88);
  });
});
