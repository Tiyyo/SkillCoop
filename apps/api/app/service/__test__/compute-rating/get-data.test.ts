import { getData } from '../../compute-rating/get-data.js';
import { PlayerStatInsight } from '../../compute-rating/sql-methods.js';

describe('get data', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });
  it('should aggregate results from all queries', async () => {
    PlayerStatInsight.mvp = vi.fn().mockResolvedValue({ nb_mvp: 1 });
    PlayerStatInsight.bestStriker = vi
      .fn()
      .mockResolvedValue({ nb_best_striker: 1 });
    PlayerStatInsight.ownEvaluation = vi.fn().mockResolvedValue({
      user_own_evaluation: {
        pace: 10,
        dribbling: 20,
        defending: 30,
        passing: 40,
        shooting: 50,
      },
    });
    PlayerStatInsight.averageEvaluation = vi.fn().mockResolvedValue({
      avg_evaluation_received: {
        pace: 90,
        dribbling: 80,
        defending: 70,
        passing: 60,
        shooting: 50,
        nb_eval_received: 10,
      },
    });

    const profileId = 123;
    const result = await getData(profileId);
    expect(result).toHaveProperty('nb_mvp');
    expect(result).toHaveProperty('nb_best_striker');
    expect(result).toHaveProperty('user_own_evaluation');
    expect(result).toHaveProperty('avg_evaluation_received');
    expect(result.nb_mvp).toEqual(1);
    expect(result.nb_best_striker).toEqual(1);
    expect(result.user_own_evaluation).toEqual({
      pace: 10,
      dribbling: 20,
      defending: 30,
      passing: 40,
      shooting: 50,
    });
    expect(result.avg_evaluation_received).toEqual({
      pace: 90,
      dribbling: 80,
      defending: 70,
      passing: 60,
      shooting: 50,
      nb_eval_received: 10,
    });
  });
});
