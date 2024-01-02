import { db } from '../../helpers/client.db';

export class GetUserPreference {
  userId: number;
  db: typeof db;
  constructor(userId: number) {
    this.userId = userId;
    this.db = db
  }
  async getUserPreference() {
    const userPreferences = await
  }
}
