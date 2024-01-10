import { ComputeRating } from '../../compute-rating/compute-data.js';

describe('compute user rating', () => {
  it('should return an object with correct property', () => {
    const mockUserEvaluationsBonus = {
      user_own_evaluation: {
        pace: 70,
        dribbling: 80,
        defending: 75,
        passing: 85,
        shooting: 90,
      },
      avg_evaluation_received: {
        pace: 65,
        dribbling: 75,
        defending: 70,
        passing: 80,
        shooting: 85,
        nb_eval_received: 5,
      },
      nb_mvp: 2,
      nb_best_striker: 3,
    };
    const profileId = 1234;
    const computeRating = new ComputeRating(
      mockUserEvaluationsBonus,
      profileId,
    );
    const result = computeRating.compute();

    expect(result).toHaveProperty('profileId');
    expect(result).toHaveProperty('avg_pace');
    expect(result).toHaveProperty('avg_dribbling');
    expect(result).toHaveProperty('avg_defending');
    expect(result).toHaveProperty('avg_passing');
    expect(result).toHaveProperty('avg_shooting');
    expect(result).toHaveProperty('gb_rating');
  });
  it('should compute data correctly', () => {
    const mockUserEvaluationsBonus = {
      user_own_evaluation: {
        pace: 70,
        dribbling: 80,
        defending: 75,
        passing: 85,
        shooting: 90,
      },
      avg_evaluation_received: {
        pace: 65,
        dribbling: 75,
        defending: 70,
        passing: 80,
        shooting: 85,
        nb_eval_received: 5,
      },
      nb_mvp: 2,
      nb_best_striker: 3,
    };
    const profileId = 1234;
    const computeRating = new ComputeRating(
      mockUserEvaluationsBonus,
      profileId,
    );
    const result = computeRating.compute();

    expect(result.avg_pace).toEqual(67);
    expect(result.avg_dribbling).toEqual(77);
    expect(result.avg_defending).toEqual(72);
    expect(result.avg_passing).toEqual(82);
    expect(result.avg_shooting).toEqual(90);
    expect(result.gb_rating).toEqual(80);
  });
  it('should compute event with incomplete data', () => {
    const mockUserEvaluationsBonus = {
      user_own_evaluation: {
        pace: 70,
        dribbling: 80,
        defending: 75,
        passing: 85,
        shooting: 90,
      },
      avg_evaluation_received: undefined,
      nb_mvp: 2,
      nb_best_striker: 3,
    };
    const profileId = 1234;
    const computeRating = new ComputeRating(
      mockUserEvaluationsBonus,
      profileId,
    );
    const result = computeRating.compute();

    expect(result.avg_pace).toEqual(70);
    expect(result.avg_dribbling).toEqual(80);
    expect(result.avg_defending).toEqual(75);
    expect(result.avg_passing).toEqual(85);
    expect(result.avg_shooting).toEqual(93);
    expect(result.gb_rating).toEqual(84);
  });
});
