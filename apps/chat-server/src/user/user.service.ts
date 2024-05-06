import { Inject, Injectable } from "@nestjs/common";
import { getFormattedUTCTimestamp } from "@skillcoop/date-handler";
import { Kysely } from "kysely";
import { DB } from "src/database/database";

@Injectable()
export class UserService {
  constructor(@Inject('dbClient') private dbClient: Kysely<DB>) { }

  async checkUserExistence(userId: string, username: string, avatar: string | null) {
    const user = await this.dbClient
      .selectFrom('user')
      .select('user_id')
      .where('user_id', "=", userId)
      .executeTakeFirst();

    if (user) return true
    const today = getFormattedUTCTimestamp()
    await this.dbClient
      .insertInto('user')
      .values({ user_id: userId, username, avatar, created_at: today })
      .execute();

    return user;
  }
}
