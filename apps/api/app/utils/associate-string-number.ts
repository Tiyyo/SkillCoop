import { LevelScale } from "../@types/types"


const associateStringToNumber = (level: LevelScale) => {

  switch (level) {
    case 'beginner':
      return 20
    case 'novice':
      return 40
    case 'intermediate':
      return 60
    case 'expert':
      return 90
    default:
      return 50
  }
}

export default associateStringToNumber