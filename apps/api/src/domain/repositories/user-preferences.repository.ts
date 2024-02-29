import { UserPreferences } from '../entities/user-preferences.entity';

export abstract class UserPreferencesRepository {
  abstract get(userId: string): Promise<UserPreferences>;
}
