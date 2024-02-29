import { Injectable } from '@nestjs/common';
import { LanguagePreferenceAdapter } from 'src/infrastructure/kysely/adapters/language-preference.adapter';

@Injectable()
export class LanguagePreferenceService {
  constructor(
    private readonly languagePreferenceAdapter: LanguagePreferenceAdapter,
  ) {}
  async generate(userId: string) {
    return await this.languagePreferenceAdapter.createOne({
      user_id: userId,
    });
  }
  async get(userId: string) {
    return await this.languagePreferenceAdapter.findOne({
      user_id: userId,
    });
  }
}
