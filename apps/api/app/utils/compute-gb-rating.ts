// Maybe restrict scores to theses props is too restrictive and doesn't
// allow scale with other sport

import type { Score } from 'skillcoop-types';

const computeGbRating = (score: Score): number => {
  const values = Object.values(score);
  const avg = values.reduce((a: number, b: number) => a + b) / values.length;

  return Math.floor(avg);
};

export default computeGbRating;
