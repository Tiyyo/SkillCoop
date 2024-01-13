import { isPastDate } from "../src/is-past";

describe('isPastDate', () => {
  afterEach(() => {
    vi.resetAllMocks()
  });
  it('it should return true if today is 2024-01-13 and the test date is 2024-01-12', () => {
    vi.useFakeTimers()
    const mockToday = new Date('2024-01-13')
    vi.setSystemTime(mockToday)
    expect(isPastDate('2024-01-12')).toBe(true);
  });
  it('it should return false if today is 2024-01-13 and the test date is 2024-01-14', () => {
    vi.useFakeTimers()
    const mockToday = new Date('2024-01-13')
    vi.setSystemTime(mockToday)
    expect(isPastDate('2024-01-14')).toBe(false);
  });
})