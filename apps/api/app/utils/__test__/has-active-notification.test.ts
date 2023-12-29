import { hasActiveNotification } from '../has-active-notification';
import { profile as Profile } from '../../models/index';

describe('hasActiveNotification', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });
  it('should return profile IDs with active notifications', async () => {
    // Mock findByPk to return different responses
    Profile.findByPk = vi.fn().mockImplementation((id) =>
      Promise.resolve({
        id,
        active_notification: id % 2,
      }),
    );
    const profileIds = [1, 2, 3, 4];
    const result = await hasActiveNotification(profileIds);

    // Check if the result contains only odd IDs
    // (since mock returns active_notification: 1 for odd IDs)
    expect(result).toEqual([1, 3]);
  });

  it(`should return null if no profile 
    IDs have active notifications`, async () => {
    Profile.findByPk = vi.fn().mockImplementation((id) =>
      Promise.resolve({
        id,
        active_notification: 0,
      }),
    );
    const profileIds = [1, 2, 3, 4];
    const result = await hasActiveNotification(profileIds);
    expect(result).toBeNull();
  });
});
