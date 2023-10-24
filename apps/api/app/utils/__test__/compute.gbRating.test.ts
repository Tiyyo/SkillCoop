import computeGbRating from '../compute-gb-rating';

describe('computeGbRating', () => {
  test('should return a number'),
    () => {
      expect(
        typeof computeGbRating({
          avg_pace: 1,
          avg_shooting: 2,
          avg_passing: 3,
          avg_dribbling: 4,
          avg_defending: 5,
        }),
      ).toBe('number');
      expect(
        computeGbRating({
          avg_pace: 1,
          avg_shooting: 2,
          avg_passing: 3,
          avg_dribbling: 4,
          avg_defending: 5,
        }),
      ).toBe(3);
    };
});
