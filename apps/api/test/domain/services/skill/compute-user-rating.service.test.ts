import { vi, describe, beforeEach, it, expect } from 'vitest';
import { ComputeUserEvaluationService } from 'src/domain/services/skills/compute-user-evaluation.service';
import { EventQueriesAdapter } from 'src/infrastructure/kysely/adapters/event.queries.adapter';
import { Kysely } from 'kysely';
import { DB } from 'src/infrastructure/kysely/database.type';
import { SkillsAdapter } from 'src/infrastructure/kysely/adapters/skills.adapter';
import { EvaluationService } from 'src/domain/services/skills/evaluation.service';

describe('ComputeUserEvaluationService', () => {
  let service: ComputeUserEvaluationService;
  let eventQueriesAdapter: EventQueriesAdapter;
  let skillsAdapter: SkillsAdapter;
  let evaluationService: EvaluationService;
  let dbClient: Kysely<DB>;

  beforeEach(async () => {
    eventQueriesAdapter = new EventQueriesAdapter(dbClient);
    skillsAdapter = new SkillsAdapter(dbClient);
    evaluationService = new EvaluationService();
    service = new ComputeUserEvaluationService(
      eventQueriesAdapter,
      skillsAdapter,
      evaluationService,
    );
  });
  describe('compute', () => {
    it('should return the correct user stats', async () => {
      service.getStats = vi.fn().mockResolvedValue({
        user_own_evaluation: {
          pace: 5,
          defending: 2,
          shooting: 4,
          passing: 5,
          dribbling: 4,
        },
        avg_evaluation_received: {
          pace: 5,
          defending: 2,
          shooting: 4,
          passing: 5,
          dribbling: 7,
          nb_eval_received: 5,
        },
        nb_mvp: 5,
        nb_best_striker: 5,
      });
      service.userStats = {
        user_own_evaluation: {
          pace: 5,
          defending: 2,
          shooting: 4,
          passing: 5,
          dribbling: 4,
        },
        avg_evaluation_received: {
          pace: 5,
          defending: 2,
          shooting: 4,
          passing: 5,
          dribbling: 7,
          nb_eval_received: 5,
        },
        nb_mvp: 5,
        nb_best_striker: 5,
      };
      const result = await service.compute('1');
      expect(result).toHaveProperty('avg_pace');
      expect(result).toHaveProperty('avg_defending');
      expect(result).toHaveProperty('avg_shooting');
      expect(result).toHaveProperty('avg_passing');
      expect(result).toHaveProperty('avg_dribbling');
      expect(result).toHaveProperty('gb_rating');
      expect(result).toHaveProperty('profileId');
      expect(result.gb_rating).toBe(35);
      expect(result.profileId).toBe('1');
    });
  });
  describe('getStats', () => {
    it('should return user stats in the correct format', async () => {
      const profileId = '1';
      skillsAdapter.getOwnEvaluation = vi.fn().mockResolvedValue({
        user_own_evaluation: {
          pace: 5,
          defending: 2,
          shooting: 4,
          passing: 5,
          dribbling: 4,
        },
      });
      skillsAdapter.getAverageEvaluation = vi.fn().mockResolvedValue({
        avg_evaluation_received: {
          pace: 5,
          defending: 2,
          shooting: 4,
          passing: 5,
          dribbling: 7,
          nb_eval_received: 5,
        },
      });
      eventQueriesAdapter.getMvpCount = vi
        .fn()
        .mockResolvedValue({ nb_mvp: 5 });
      eventQueriesAdapter.getBestStrikerCount = vi.fn().mockResolvedValue({
        nb_best_striker: 5,
      });
      const result = await service.getStats(profileId);
      expect(result).toEqual({
        user_own_evaluation: {
          pace: 5,
          defending: 2,
          shooting: 4,
          passing: 5,
          dribbling: 4,
        },
        avg_evaluation_received: {
          pace: 5,
          defending: 2,
          shooting: 4,
          passing: 5,
          dribbling: 7,
          nb_eval_received: 5,
        },
        nb_mvp: 5,
        nb_best_striker: 5,
      });
    });
  });
  describe('applyMvpBonus', () => {
    it('should return the correct bonus value', async () => {
      service.userStats = {
        nb_mvp: 5,
        nb_best_striker: 5,
        user_own_evaluation: {
          pace: 8,
          defending: 7,
          passing: 3,
          dribbling: 6,
          shooting: 2,
        },
        avg_evaluation_received: {
          pace: 8,
          defending: 7,
          passing: 3,
          dribbling: 6,
          shooting: 2,
          nb_eval_received: 5,
        },
      };
      const result = service.applyMvpBonus(5);
      expect(result).toBe(32);
    });
  });
  describe('computeAvgSkillValue', () => {
    it('should return the correct avg pace skill value', async () => {
      service.userStats = {
        nb_mvp: 5,
        nb_best_striker: 5,
        user_own_evaluation: {
          pace: 8,
          defending: 7,
          passing: 3,
          dribbling: 6,
          shooting: 2,
        },
        avg_evaluation_received: {
          pace: 8,
          defending: 7,
          passing: 3,
          dribbling: 6,
          shooting: 2,
          nb_eval_received: 5,
        },
      };
      vi.spyOn(service, 'getNumerator');
      vi.spyOn(service, 'getDenominator');
      service.computeAvgSkillValue('pace');
      expect(service.getNumerator).toHaveBeenCalledWith({
        ownEval: 8,
        receivedEval: 8,
        nbReceivedEval: 5,
        nbBonus: 0,
      });
      expect(service.getDenominator).toHaveBeenCalledWith({
        ownEval: 8,
        receivedEval: 8,
        nbReceivedEval: 5,
        nbBonus: 0,
      });
    });
    it('should return the correct avg shooting skill value', async () => {
      service.userStats = {
        nb_mvp: 5,
        nb_best_striker: 5,
        user_own_evaluation: {
          pace: 8,
          defending: 7,
          passing: 3,
          dribbling: 6,
          shooting: 2,
        },
        avg_evaluation_received: {
          pace: 8,
          defending: 7,
          passing: 3,
          dribbling: 6,
          shooting: 2,
          nb_eval_received: 5,
        },
      };
      vi.spyOn(service, 'getNumerator');
      vi.spyOn(service, 'getDenominator');
      service.computeAvgSkillValue('shooting');
      expect(service.getNumerator).toHaveBeenCalledWith({
        ownEval: 2,
        receivedEval: 2,
        nbReceivedEval: 5,
        nbBonus: 5,
      });
      expect(service.getDenominator).toHaveBeenCalledWith({
        ownEval: 2,
        receivedEval: 2,
        nbReceivedEval: 5,
        nbBonus: 5,
      });
    });
  });
  describe('getNumerator', () => {
    it('should return the correct numerator value', async () => {
      const args = {
        ownEval: 5,
        receivedEval: 5,
        nbReceivedEval: 5,
        nbBonus: 5,
      };
      const result = service.getNumerator(args);
      expect(result).toBe(560);
    });
    it('should return the correct numerator value with 0', async () => {
      const args = {
        ownEval: 0,
        receivedEval: 0,
        nbReceivedEval: 10,
        nbBonus: 0,
      };
      const result = service.getNumerator(args);
      expect(result).toBe(0);
    });
  });
  describe('getDenominator', () => {
    it('should return the correct denominator value', async () => {
      const args = {
        ownEval: 5,
        receivedEval: 5,
        nbReceivedEval: 5,
        nbBonus: 5,
      };
      const result = service.getDenominator(args);
      expect(result).toBe(17);
    });
    it('should return the correct denominator value with 0', async () => {
      const args = {
        ownEval: 0,
        receivedEval: 0,
        nbReceivedEval: 10,
        nbBonus: 0,
      };
      const result = service.getDenominator(args);
      expect(result).toBe(0);
    });
  });
  describe('productNumerator', () => {
    it('should return the correct product value', async () => {
      const result = service.productNumerator(10, 3);
      expect(result).toBe(30);
    });
    it('should return 0 if value is undefined', async () => {
      const result = service.productNumerator(undefined, 3);
      expect(result).toBe(0);
    });
    it('should return the value if there is no coeficient', async () => {
      const result = service.productNumerator(10);
      expect(result).toBe(10);
    });
  });
});
