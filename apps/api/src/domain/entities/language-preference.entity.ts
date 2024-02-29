export class LangguagePreferenceEntity {
  user_id: string;
  name: string;

  constructor({ user_id, name }: LangguagePreferenceEntity) {
    this.user_id = user_id;
    this.name = name;
  }
}
