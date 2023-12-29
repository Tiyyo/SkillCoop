import condition from '../../generate-teams/condition';
const { random, regular, ifZero } = condition;

describe('randomCondition', () => {
  test('should return a boolean', () => {
    expect(typeof random()).toBe('boolean');
  });
});

describe('regularCondition', () => {
  test('should return a boolean', () => {
    expect(typeof regular(1, 2)).toBe('boolean');
    expect(typeof regular(2, 1)).toBe('boolean');
  });
  test('should return true if valueTeam1 < valueTeam2', () => {
    expect(regular(1, 2)).toBe(true);
  });
  test('should return false if valueTeam1 > valueTeam2', () => {
    expect(regular(2, 1)).toBe(false);
  });
});

describe('conditionIfZero', () => {
  test('should return a boolean', () => {
    expect(typeof ifZero(1, 2)).toBe('boolean');
    expect(typeof ifZero(2, 1)).toBe('boolean');
  });
  test('should return true if lengthTeam1 < lengthTeam2', () => {
    expect(ifZero(1, 2)).toBe(true);
  });
  test('should return false if lengthTeam1 > lengthTeam2', () => {
    expect(ifZero(2, 1)).toBe(false);
  });
});
