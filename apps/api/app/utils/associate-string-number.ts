import { LevelScale } from "../@types/types"


const associateStringToNumber = (level: LevelScale) => {

    switch (level) {
        case 'beginner':
            return 2
        case 'novice':
            return 4
        case 'intermediate':
            return 6
        case 'expert':
            return 9
        default:
            return 5
    }
}

export default associateStringToNumber