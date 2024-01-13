import { getAge } from '../src/age';

describe('getAge', () => {
  afterEach(() => {
    vi.resetAllMocks()
  });
  it('should return null if utcstring is null', () => {
    expect(getAge(null)).toBe(null);
  });
  it('should return null if utcstring is not a string', () => {
    expect(getAge(123 as any)).toBe(null);
  });
  it('should return null if utcstring is not a valid date', () => {
    expect(getAge('not a valid date')).toBe(null);
  });
  it('it should return 34 if birthday is 1990-01-01 and today is 2020-01-02', () => {
    vi.useFakeTimers()
    const mockToday = new Date('2024-01-13')
    vi.setSystemTime(mockToday)
    expect(getAge('1990-01-01')).toBe(34);
  });
  it('it should return 31 if birthday is 1992-12-09 and today is 2024-01-13', () => {
    vi.useFakeTimers()
    const mockToday = new Date('2024-01-13')
    vi.setSystemTime(mockToday)
    expect(getAge('1992-12-09')).toBe(31);
  })
  it('it should return 49 if birthday is 1990-12-09 and today is 2024-01-13', () => {
    vi.useFakeTimers()
    const mockToday = new Date('2024-01-13')
    vi.setSystemTime(mockToday)
    expect(getAge('1974-01-14')).toBe(49);
  })
})