import associateStringNumber from './associate.string.number';

describe('associateStringNumber', () => {
    test("should return a number"), () => {
        expect(typeof associateStringNumber("beginner")).toBe("number")
        expect(associateStringNumber("brandon")).toBe(5)
    }
    test("should return 2 for beginner"), () => {
        expect(associateStringNumber("beginner")).toBe(2)
    }
    test("should return 4 for novice"), () => {
        expect(associateStringNumber("novice")).toBe(4)
    }
    test("should return 6 for intermediate"), () => {
        expect(associateStringNumber("intermediate")).toBe(6)
    }
    test("should return 9 for expert"), () => {
        expect(associateStringNumber("expert")).toBe(9)
    }
});