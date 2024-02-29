import { DomainException } from '../shared/domain-exception';

export class SkillRating {
  private readonly value: number;

  constructor(value: number) {
    if (!this.isValid(value)) {
      throw new DomainException(
        'Skill rating must be between 0 and 100.',
        'SkillRating',
      );
    }
    this.value = value;
  }

  private isValid(value: number): boolean {
    return value >= 0 && value <= 100;
  }

  get skill() {
    return this.value;
  }
}
