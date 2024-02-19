export class SkillRating {
  private readonly value: number;

  constructor(value: number) {
    if (!this.isValid(value)) {
      // throw a domain exception
      throw new Error('Skill rating must be between 0 and 100.');
    }
    this.value = value;
  }

  private isValid(value: number): boolean {
    return value >= 0 && value <= 100;
  }

  getValue(): number {
    return this.value;
  }
}
