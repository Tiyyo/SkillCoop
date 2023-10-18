// import { getMaxIndex, useRigthCondition } from "../generate-teams";
// // import { useRandomConditionAtStart } from "../generate-teams";
// import { deleteFromArrayAfterPush } from "../generate-teams";
// import { getRandomArbitrary } from "../generate-teams";
// import { getTeamValue } from "../generate-teams";
// import { getPlayerObject } from "../generate-teams";
// import { divideInTeam } from "../generate-teams";
// import { assignTeam, randomCondition, regularCondition, conditionIfZero } from "../generate-teams";

// describe('assignTeam', () => {
//   test('should return a number'), () => {
//     expect(assignTeam(1)).toBe("number")
//   }
//   test('should return 1 if inferior to 5'), () => {
//     expect(assignTeam(1)).toBe(1)
//     expect(assignTeam(4)).toBe(1)
//   }
//   test('should return 2 if superior to 5'), () => {
//     expect(assignTeam(5)).toBe(2)
//     expect(assignTeam(9)).toBe(2)
//   }
//   test('should return 2 if equal to 5'), () => {
//     expect(assignTeam(5)).toBe(2)
//   }
// })

// describe('randomCondition', () => {
//   test('should return a boolean'), () => {
//     expect(typeof randomCondition()).toBe("boolean")
//   }
// })

// describe('regularCondition', () => {
//   test('should return a boolean'), () => {
//     expect(typeof regularCondition(1, 2)).toBe("boolean")
//     expect(typeof regularCondition(2, 1)).toBe("boolean")
//   }
//   test('should return true if valueTeam1 < valueTeam2'), () => {
//     expect(regularCondition(1, 2)).toBe(true)
//   }
//   test('should return false if valueTeam1 > valueTeam2'), () => {
//     expect(regularCondition(2, 1)).toBe(false)
//   }
// })

// describe('conditionIfZero', () => {
//   test('should return a boolean'), () => {
//     expect(typeof conditionIfZero(1, 2)).toBe("boolean")
//     expect(typeof conditionIfZero(2, 1)).toBe("boolean")
//   }
//   test('should return true if lengthTeam1 < lengthTeam2'), () => {
//     expect(conditionIfZero(1, 2)).toBe(true)
//   }
//   test('should return false if lengthTeam1 > lengthTeam2'), () => {
//     expect(conditionIfZero(2, 1)).toBe(false)
//   }
// })

// describe('useRigthCondition', () => {
//   afterEach(() => {
//     vi.restoreAllMocks();
//   });
//   const mockConfig = {
//     team1: [{ gb_rating: 1, profile_id: 2 }],
//     team2: [{ gb_rating: 2, profile_id: 1 }],
//     ids: [1, 2, 3],
//     values: [1, 2, 3],
//     participants: 3
//   }

//   const mockPlayer = {
//     profile_id: 1,
//     gb_rating: 1
//   }

//   const mockValueTeam1 = 1
//   const mockValueTeam2 = 2

//   vi.mock('../generate-teams', () => {
//     return {
//       randomCondition: vi.fn(),
//       regularCondition: vi.fn(),
//     }
//   })

//   test('should call regularCondition if participants !== ids.length', () => {
//     useRigthCondition(mockConfig, mockPlayer, mockValueTeam1, mockValueTeam2)
//     expect(regularCondition).toHaveBeenCalled()
//   })
// })

// // describe('getMaxIndex', () => {
// //   test("should return the index of the max value"), () => {
// //     expect(typeof getMaxIndex([1, 2, 3])).toBe("number")
// //     expect(getMaxIndex([1, 2, 3])).toBe(2)
// //     expect(getMaxIndex([3, 3, 2])).toBe(3)
// //   }
// // })

// // describe('useRandomConditionAtStart', () => {
// //   test("should return true or false when participant > ids.length"), () => {
// //     expect(typeof useRandomConditionAtStart(3, ["1", "2",], 1, 2)).toBe("boolean")
// //     expect(useRandomConditionAtStart(3, ["1", "2",], 1, 2)).toBe(true)
// //     expect(useRandomConditionAtStart(3, ["1", "2"], 2, 1)).toBe(false)
// //   }
// // })

// // describe('deleteFromArrayAfterPush', () => {
// //   test("should delete the index from the array"), () => {
// //     expect(typeof deleteFromArrayAfterPush(["1", "2", "3"], [1, 2, 3], 0)).toBe("array")
// //     expect(deleteFromArrayAfterPush(["1", "2", "3"], [1, 2, 3], 0)).toBe(["2", "3"])
// //   }
// // })

// // describe('getRandomArbitrary', () => {
// //   test("should return a random number between min and max"), () => {
// //     expect(typeof getRandomArbitrary(0, 1)).toBe("number")
// //     expect(getRandomArbitrary(0, 1)).toBe(0.5)
// //   }
// // })

// // const mockTeams = [{ gb_rating: 1, profile_id: 2 }, { gb_rating: 2, profile_id: 1 }]

// // describe('getTeamValue', () => {
// //   test("should return the sum of the gb_rating of each player"), () => {
// //     expect(typeof getTeamValue(mockTeams)).toBe("number")
// //     expect(getTeamValue(mockTeams)).toBe(3)
// //   }
// // })

// // describe('getPlayerObject', () => {
// //   test("should return an object with the profile_id and gb_rating"), () => {
// //     expect(typeof getPlayerObject(0, ["1", "2", "3"], [1, 2, 3])).toBe("object")
// //     expect(getPlayerObject(0, ["1", "2", "3"], [1, 2, 3])).toBe({ profile_id: "1", gb_rating: 1 })
// //   }
// // })

// // const mockConfig = {
// //   team1: [{ gb_rating: 1, profile_id: 2 }],
// //   team2: [{ gb_rating: 2, profile_id: 1 }],
// //   ids: ["1", "2", "3"],
// //   values: [1, 2, 3],
// //   participants: 3
// // }

// // describe('divideInTeam', () => {
// //   test("should return an object with the two teams"), () => {
// //     expect(typeof divideInTeam(mockConfig)).toBe("object")
// //     expect(divideInTeam(mockConfig)).toHaveProperty("team_1")
// //     expect(divideInTeam(mockConfig)).toHaveProperty("team_2")
// //     expect(divideInTeam(mockConfig)).toBe({ team_1: [{ gb_rating: 1, profile_id: 2 }], team_2: [{ gb_rating: 2, profile_id: 1 }] })
// //   }
// // })



