import { Inject, Injectable } from '@nestjs/common';
import { Kysely, sql } from 'kysely';
import { CoreAdapter } from 'src/infrastructure/kysely/adapters/core.adapter';
import { DB } from 'src/infrastructure/kysely/database.type';
import { FriendRepository } from 'src/domain/repositories/friend.repository';
import { DatabaseException } from '../database.exception';
import { getFormattedUTCTimestamp } from '@skillcoop/date-handler';

@Injectable()
export class FriendAdapter
  extends CoreAdapter<'profile_on_profile'>
  implements FriendRepository {
  constructor(@Inject('dbClient') protected dbClient: Kysely<DB>) {
    super(dbClient);
  }
  async findFriends(profileId: string) {
    try {
      const friends = await this.dbClient
        .selectFrom('profile_on_profile')
        .select(['friend_id', 'adder_id', 'status_name'])
        .limit(20)
        .innerJoin(
          'profile',
          'profile.profile_id',
          'profile_on_profile.friend_id',
        )
        .select([
          'profile.avatar_url',
          'profile.username',
          'profile.last_evaluation',
        ])
        .where('adder_id', '=', profileId)
        .where('status_name', '=', 'confirmed')
        .where('friend_id', '<>', profileId)
        .execute();

      return friends;
    } catch (error) {
      if (error instanceof Error) {
        throw new DatabaseException(error);
      }
    }
  }
  async searchFriends(profileId: string, query: string, page: number) {
    const offset = (page - 1) * 10;
    try {
      const friends = await this.client
        .selectFrom('profile_on_profile')
        .select(['friend_id', 'adder_id', 'status_name'])
        .offset(offset)
        .limit(20)
        .innerJoin(
          'profile',
          'profile.profile_id',
          'profile_on_profile.friend_id',
        )
        .select([
          'profile.avatar_url',
          'profile.username',
          'profile.last_evaluation',
        ])
        .where('adder_id', '=', profileId)
        .where('status_name', '=', 'confirmed')
        .where('username', 'like', `%${query.toLowerCase()}%`)
        .execute();
      return friends;
    } catch (error) {
      if (error instanceof Error) {
        throw new DatabaseException(error);
      }
    }
  }
  async findRelation(profileId: string, withId: string) {
    try {
      const isRelationExist = await this.dbClient
        .selectFrom('profile_on_profile')
        .select(['friend_id', 'adder_id', 'status_name'])
        .where(({ eb, or, and }) =>
          or([
            and([eb('adder_id', '=', profileId), eb('friend_id', '=', withId)]),
            and([eb('adder_id', '=', withId), eb('friend_id', '=', profileId)]),
          ]),
        )
        .executeTakeFirstOrThrow();
      return !!isRelationExist;
    } catch (error) {
      if (error instanceof Error) {
        throw new DatabaseException(error);
      }
    }
  }
  async updateStatus(from: string, to: string, status: string): Promise<void> {
    const todayUTCString = getFormattedUTCTimestamp();
    try {
      await this.dbClient.transaction().execute(async (trx) => {
        await trx
          .insertInto('profile_on_profile')
          .values({
            friend_id: from,
            adder_id: to,
            status_name: status,
            created_at: todayUTCString,
          })
          .executeTakeFirst();

        await trx
          .updateTable('profile_on_profile')
          .set({
            status_name: status,
            updated_at: todayUTCString,
          })
          .where('adder_id', '=', from)
          .where('friend_id', '=', to)
          .executeTakeFirst();
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new DatabaseException(error);
      }
    }
  }
  async findPendingRequests(profileId: string) {
    try {
      const pendingRequests = await this.client
        .selectFrom('profile_on_profile')
        .select(['friend_id', 'adder_id', 'status_name'])
        .innerJoin(
          'profile',
          'profile.profile_id',
          'profile_on_profile.adder_id',
        )
        .select([
          'profile.avatar_url',
          'profile.username',
          'profile.last_evaluation',
        ])
        .where('friend_id', '=', profileId)
        .where('status_name', '=', 'pending')
        .execute();

      return pendingRequests;
    } catch (error) {
      if (error instanceof Error) {
        throw new DatabaseException(error);
      }
    }
  }
  async getSuggestedFriends(profileId: string) {
    try {
      const suggestProfiles = await sql<{
        friend_id: number;
        username: string;
        avatar_url: string | null;
        last_evaluation: number | null;
      }>`
SELECT 
  friend_id AS profile_id,
  username,
  avatar_url,
  last_evaluation
FROM
  (
    SELECT friend_id
    FROM profile_on_profile
    WHERE profile_on_profile.adder_id IN 
          (
          SELECT friend_id
          FROM profile_on_profile
          WHERE profile_on_profile.adder_id = ${profileId}
          AND profile_on_profile.status_name = 'confirmed'
        )
    AND profile_on_profile.status_name = 'confirmed'
    UNION
    SELECT profile_id
      FROM profile_on_event
      WHERE profile_on_event.event_id IN ( 
          SELECT 
            event.id
          FROM event
          WHERE event.status_name = 'completed'
          AND EXISTS (
            SELECT 1
            FROM profile_on_event
            WHERE event_id = event.id
            AND profile_id = ${profileId}
            )
          ORDER BY event.date DESC
          LIMIT 3
        ) 
    )
  JOIN profile ON friend_id = profile.profile_id
  WHERE friend_id  NOT IN ( 
        SELECT friend_id
        FROM profile_on_profile
        WHERE adder_id = ${profileId}
        AND (status_name = 'confirmed' OR status_name = 'pending')
      )
AND friend_id <> ${profileId}
LIMIT 14`.execute(this.client);

      return suggestProfiles.rows;
    } catch (error) {
      if (error instanceof Error) {
        throw new DatabaseException(error);
      }
    }
  }
}
