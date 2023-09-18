import { getMaxIndex } from ".";
import { useRandomConditionAtStart } from ".";
import { deleteFromArrayAfterPush } from ".";
import { getRandomArbitrary } from ".";
import { getTeamValue } from ".";
import { getPlayerObject } from ".";
import { divideInTeam } from ".";


describe('getMaxIndex', () => {
    test("should return the index of the max value"), () => {
        expect(typeof getMaxIndex([1, 2, 3])).toBe("number")
        expect(getMaxIndex([1, 2, 3])).toBe(2)
        expect(getMaxIndex([3, 3, 2])).toBe(3)
    }
})

describe('useRandomConditionAtStart', () => {
    test("should return true or false when participant > ids.length"), () => {
        expect(typeof useRandomConditionAtStart(3, ["1", "2",], 1, 2)).toBe("boolean")
        expect(useRandomConditionAtStart(3, ["1", "2",], 1, 2)).toBe(true)
        expect(useRandomConditionAtStart(3, ["1", "2"], 2, 1)).toBe(false)
    }
})

describe('deleteFromArrayAfterPush', () => {
    test("should delete the index from the array"), () => {
        expect(typeof deleteFromArrayAfterPush(["1", "2", "3"], [1, 2, 3], 0)).toBe("array")
        expect(deleteFromArrayAfterPush(["1", "2", "3"], [1, 2, 3], 0)).toBe(["2", "3"])
    }
})

describe('getRandomArbitrary', () => {
    test("should return a random number between min and max"), () => {
        expect(typeof getRandomArbitrary(0, 1)).toBe("number")
        expect(getRandomArbitrary(0, 1)).toBe(0.5)
    }
})

const mockTeams = [{ gb_rating: 1, profile_id: 2 }, { gb_rating: 2, profile_id: 1 }]

describe('getTeamValue', () => {
    test("should return the sum of the gb_rating of each player"), () => {
        expect(typeof getTeamValue(mockTeams)).toBe("number")
        expect(getTeamValue(mockTeams)).toBe(3)
    }
})

describe('getPlayerObject', () => {
    test("should return an object with the profile_id and gb_rating"), () => {
        expect(typeof getPlayerObject(0, ["1", "2", "3"], [1, 2, 3])).toBe("object")
        expect(getPlayerObject(0, ["1", "2", "3"], [1, 2, 3])).toBe({ profile_id: "1", gb_rating: 1 })
    }
})

const mockConfig = {
    team1: [{ gb_rating: 1, profile_id: 2 }],
    team2: [{ gb_rating: 2, profile_id: 1 }],
    ids: ["1", "2", "3"],
    values: [1, 2, 3],
    participants: 3
}

describe('divideInTeam', () => {
    test("should return an object with the two teams"), () => {
        expect(typeof divideInTeam(mockConfig)).toBe("object")
        expect(divideInTeam(mockConfig)).toHaveProperty("team_1")
        expect(divideInTeam(mockConfig)).toHaveProperty("team_2")
        expect(divideInTeam(mockConfig)).toBe({ team_1: [{ gb_rating: 1, profile_id: 2 }], team_2: [{ gb_rating: 2, profile_id: 1 }] })
    }
})



