import { getRandomArbitrary } from './algo';

export default {
  random(): boolean {
    const randomNumberStart = getRandomArbitrary(0, 1);
    return randomNumberStart > 0.5;
  },
  regular(valueTeam1: number, valueTeam2: number): boolean {
    return !(valueTeam1 > valueTeam2);
  },
  ifZero(lengthTeam1: number, lengthTeam2: number): boolean {
    return lengthTeam1 < lengthTeam2;
  },
};
