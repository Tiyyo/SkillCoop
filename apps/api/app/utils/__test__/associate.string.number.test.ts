import associateStringNumber from '../associate-string-number';

describe('associateStringNumber', () => {
  test('should return a number', () => {
    expect(typeof associateStringNumber('beginner')).toBeTypeOf('number');
    // @ts-ignore
    expect(associateStringNumber('brandon')).toEqual(50);
  });
  test('should return 20 for beginner', () => {
    expect(associateStringNumber('beginner')).toEqual(20);
  });
  test('should return 35 for novice', () => {
    expect(associateStringNumber('novice')).toEqual(35);
  });
  test('should return 55 for intermediate', () => {
    expect(associateStringNumber('intermediate')).toEqual(55);
  });
  test('should return 75 for advanced', () => {
    expect(associateStringNumber('advanced')).toEqual(75);
  });
  test('should return 90 for expert', () => {
    expect(associateStringNumber('expert')).toEqual(90);
  });
});
