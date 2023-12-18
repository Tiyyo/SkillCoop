import type { LevelScale } from 'skillcoop-types';

const associateStringToNumber = (level: LevelScale): number => {
  switch (level) {
    case 'beginner':
      return 20;
    case 'novice':
      return 35;
    case 'intermediate':
      return 55;
    case 'advanced':
      return 75;
    case 'expert':
      return 90;
    default:
      return 50;
  }
};

export default associateStringToNumber;
