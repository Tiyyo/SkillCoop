import checkParams from '../check-params';

describe('checkParams', () => {
  test('should return an array of numbers', () => {
    expect(typeof checkParams('1', '2', '3')).toBe('object');
    expect(checkParams('1', '2', '3')).toEqual([1, 2, 3]);
    expect(checkParams('1', '2', '3')).toEqual([1, 2, 3]);
  });
  test(`should throw an error if at 
    least one param cant be converted in number`, () => {
    expect(() => checkParams('1', '2', 'petit')).toThrowError(
      'There is at least one invalid param',
    );
  });
});
