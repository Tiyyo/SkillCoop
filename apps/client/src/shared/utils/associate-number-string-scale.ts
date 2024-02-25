import { LevelScale } from '@skillcoop/types/src';

const associateNumberToString = (gbrating: number): LevelScale | 'NC' => {
  console.log('gbrating', gbrating);
  if (gbrating < 20) return 'beginner';
  if (gbrating < 35) return 'novice';
  if (gbrating < 75) return 'intermediate';
  if (gbrating < 90) return 'advanced';
  if (gbrating < 101) return 'expert';
  return 'NC';
};

export default associateNumberToString;
