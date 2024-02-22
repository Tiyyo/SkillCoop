import { Injectable } from '@nestjs/common';
import { ThemePreferenceAdapter } from 'src/infrastructure/kysely/adapters/theme-preference.adapter';

@Injectable()
export class ThemePreferenceService {
  constructor(
    private readonly themePreferenceAdapter: ThemePreferenceAdapter,
  ) { }
  async generate(userId: string) {
    return await this.themePreferenceAdapter.createOne({
      user_id: userId,
    });
  }
  async get(userId: string) {
    return await this.themePreferenceAdapter.findOne({
      user_id: userId,
    });
  }
}
