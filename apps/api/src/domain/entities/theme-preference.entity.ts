export class ThemePreferenceEntity {
  user_id: string;
  name: string;

  constructor({ user_id, name }: ThemePreferenceEntity) {
    this.user_id = user_id;
    this.name = name;
  }
}
