import { getMaxIndex, useRigthCondition } from '../generate-teams';
import { deleteFromArrayAfterPush } from '../generate-teams';
import { getTeamValue } from '../generate-teams';
import { getPlayerObject } from '../generate-teams';
import { divideInTeam } from '../generate-teams';
import { assignTeam } from '../generate-teams';

describe('assignTeam', () => {
  test('should return a number',
    () => {
      expect(typeof assignTeam(1)).toBe('number');
    });
  test('should return 1 if inferior to 5',
    () => {
      expect(assignTeam(1, 10)).toBe(1);
      expect(assignTeam(4, 10)).toBe(1);
    });
  test('should return 2 if superior to 5',
    () => {
      expect(assignTeam(5, 10)).toBe(2);
      expect(assignTeam(9 ,10)).toBe(2);
    });
  test('should return 2 if equal to 5',
    () => {
      expect(assignTeam(5, 10)).toBe(2);
    });
});

describe('useRigthCondition', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  const mockConditions = {
    random: vi.fn(),
    regular: vi.fn(),
    ifZero: vi.fn()
  };

  test(`should call random condition if 
    participant is equal of length [ids]`, () => {
    const mockConfig = {
      team1: [{ gb_rating: 1, profile_id: 2 }],
      team2: [{ gb_rating: 2, profile_id: 1 }],
      ids: [1, 2, 3],
      values: [1, 2, 3],
      participants: 3,
    };

    const mockPlayer = {
      profile_id: 1,
      gb_rating: 1,
    };

    const mockValueTeam1 = 1;
    const mockValueTeam2 = 2;
    useRigthCondition(
      mockConfig,
      mockPlayer,
      mockValueTeam1,
      mockValueTeam2,
      mockConditions);
    expect(mockConditions.random).toHaveBeenCalled();
  });
  test('should call random condition ifZero if player have 0 as rating', () => {
    const mockConfig = {
      team1: [{ gb_rating: 1, profile_id: 2 }],
      team2: [{ gb_rating: 2, profile_id: 1 }],
      ids: [1, 2, 3],
      values: [1, 2, 3],
      participants: 7,
    };

    const mockPlayer = {
      profile_id: 1,
      gb_rating: 0,
    };

    const mockValueTeam1 = 1;
    const mockValueTeam2 = 2;
    useRigthCondition(
      mockConfig,
      mockPlayer,
      mockValueTeam1,
      mockValueTeam2,
      mockConditions);
    expect(mockConditions.ifZero).toHaveBeenCalled();
    expect(mockConditions.ifZero).toHaveBeenCalledWith(
      mockConfig.team1.length,
      mockConfig.team2.length,
    );
  });
  test('should call regular condition', () => {
    const mockConfig = {
      team1: [
        { gb_rating: 2, profile_id: 2 },
        { gb_rating: 23, profile_id: 3 },
      ],
      team2: [{ gb_rating: 22, profile_id: 1 }],
      ids: [4, 5, 6],
      values: [10, 7, 8],
      participants: 6,
    };

    const mockPlayer = {
      profile_id: 4,
      gb_rating: 10,
    };

    const mockValueTeam1 = 1;
    const mockValueTeam2 = 2;
    useRigthCondition(
      mockConfig,
      mockPlayer,
      mockValueTeam1,
      mockValueTeam2,
      mockConditions);
    expect(mockConditions.regular).toHaveBeenCalled();
    expect(mockConditions.regular).toHaveBeenCalledWith(
      mockValueTeam1,
      mockValueTeam2,
    );
  });
});

describe('getMaxIndex', () => {
  test('should return the index of the max value', () => {
    expect(typeof getMaxIndex([1, 2, 3])).toBe('number');
    expect(getMaxIndex([1, 2, 3])).toStrictEqual(2);
    expect(getMaxIndex([3, 3, 2])).toEqual(0);
    expect(getMaxIndex([1, 4, 6, 7, 5])).toEqual(3);
  });
});

describe('deleteFromArrayAfterPush', () => {
  test('should delete the index from the array',
    () => {
      const mockIds = [1, 2, 3];
      const mockValues = [1, 2, 3];
      const mockIndex = 0;
      deleteFromArrayAfterPush(mockIds, mockValues, mockIndex);
      expect(mockIds).toEqual([2, 3,]);
      expect(mockValues).toEqual([2, 3,]);
    });
});

describe('getTeamValue', () => {
  const mockTeams = [
    { gb_rating: 1, profile_id: 2 },
    { gb_rating: 2, profile_id: 1 },
  ];
  test('should return the sum of the gb_rating of each player',
    () => {
      expect(typeof getTeamValue(mockTeams)).toBe('number');
      expect(getTeamValue(mockTeams)).toBe(3);
    });
});

describe('getPlayerObject', () => {
  test('should return an object with the profile_id and gb_rating', () => {
    const result = getPlayerObject(0, [1, 2, 3], [1, 2, 3]);

    expect(typeof result).toBe('object');
    expect(result).toEqual({
      profile_id: 1,
      gb_rating: 1,
    });
  });
});

describe('divideInTeam', () => {
  test('should return an object with the two teams',
    () => {
      const mockConfig = {
        team1: [{ gb_rating: 1, profile_id: 2 }],
        team2: [{ gb_rating: 2, profile_id: 1 }],
        ids: [3, 4, 5, 6],
        values: [1, 2, 3, 8],
        participants: 6,
      };
      expect(typeof divideInTeam(mockConfig)).toBe('object');
      expect(divideInTeam(mockConfig)).toHaveProperty('team1');
      expect(divideInTeam(mockConfig)).toHaveProperty('team2');
    });
  test('should return an object with the two of same length',
    () => {
      const mockConfig = {
        team1: [],
        team2: [],
        ids: [1, 2, 3, 4, 5, 6],
        values: [25, 13, 47, 33, 12, 1],
        participants: 6,
      };
      const result = divideInTeam(mockConfig);
      expect(result.team1.length).toBe(3);
      expect(result.team2.length).toBe(3);
      expect(result.team1.length).toBe(result.team2.length);
    });
});
