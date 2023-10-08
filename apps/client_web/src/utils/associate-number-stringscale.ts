import { LevelScale } from "../types"

// https://stackoverflow.com/questions/6665997/switch-statement-for-greater-than-less-than
const associateNumberToString = (gbrating: number): LevelScale => {
  if (gbrating < 20) return 'beginner'
  if (gbrating < 35) return 'novice'
  if (gbrating < 75) return 'intermediate'
  if (gbrating < 90) return 'advanced'
  if (gbrating < 101) return 'expert'
  return 'intermediate'
}

export default associateNumberToString
