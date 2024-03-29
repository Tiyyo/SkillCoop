import { Injectable } from '@nestjs/common';

@Injectable()
export class SkillService {
  associateStringToNumber(str: string) {
    switch (str) {
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
  }
}
