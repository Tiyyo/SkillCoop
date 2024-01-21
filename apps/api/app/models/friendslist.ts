import { sql } from 'kysely';
import DatabaseError from '../helpers/errors/database.error.js';
import { Core } from './core.js';
import UserInputError from '../helpers/errors/user-input.error.js';
import { getFormattedUTCTimestamp } from '@skillcoop/date-handler';
import { tableNames } from '../@types/types.js';
import { db } from '../helpers/client.db.js';

export class Friendlist extends Core<typeof tableNames.profile_on_profile> {
  declare tableName: typeof tableNames.profile_on_profile;

  constructor(client: typeof db) {
    super(client);
    this.tableName = tableNames.profile_on_profile;
  }
  async findAllByPk(id: number) {
    try {
      const friendships = await this.client
        .selectFrom(this.tableName)
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
        .where('adder_id', '=', id)
        .where('status_name', '=', 'confirmed')
        .where('friend_id', '<>', id)
        .execute();

      return friendships;
    } catch (error) {
      if (error instanceof Error) {
        throw new DatabaseError(error);
      }
    }
  }
  async find(adder_id: number, friend_id: number, status_name?: string) {
    try {
      let query = this.client
        .selectFrom(this.tableName)
        .select(['friend_id', 'adder_id', 'status_name'])
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
        .where('adder_id', '=', adder_id)
        .where('friend_id', '=', friend_id);

      if (status_name) {
        query = query.where('status_name', '=', status_name);
      }
      const friend = await query.executeTakeFirst();
      return friend;
    } catch (error) {
      if (error instanceof Error) {
        throw new DatabaseError(error);
      }
    }
  }
  async findFriendByUsernameInUserFriendlist(
    profileId: number,
    query: string,
    page: number = 1,
  ) {
    const offset = (page - 1) * 10;
    try {
      const friends = await this.client
        .selectFrom(this.tableName)
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
        throw new DatabaseError(error);
      }
    }
  }
  async sendRequest(adder_id: number, friend_id: number) {
    try {
      const friendshipExist = await sql`
          SELECT *
          FROM profile_on_profile
          WHERE (adder_id = ${adder_id} AND friend_id = ${friend_id})
          OR (adder_id = ${friend_id} AND friend_id = ${adder_id})
          `.execute(this.client);

      if (friendshipExist.rows.length > 0)
        throw new UserInputError(
          "You can't send a friend request to this user",
        );

      const todayUTCString = getFormattedUTCTimestamp();
      const addPendingFriendship = await this.client
        .insertInto(this.tableName)
        .values({
          //@ts-ignore
          friend_id: friend_id,
          adder_id,
          status_name: 'pending',
          created_at: todayUTCString,
        })
        .execute();

      return !!Number(addPendingFriendship[0].numInsertedOrUpdatedRows);
    } catch (error) {
      if (error instanceof Error) {
        throw new DatabaseError(error);
      }
    }
  }
  async updateStatus({
    friend_id,
    adder_id,
    status_name,
  }: {
    friend_id: number;
    adder_id: number;
    status_name: string;
  }) {
    const todayUTCString = getFormattedUTCTimestamp();

    try {
      await this.client
        .insertInto(this.tableName)
        .values({
          //@ts-ignore
          friend_id: adder_id,
          adder_id: friend_id,
          status_name,
          created_at: todayUTCString,
        })
        .executeTakeFirst();

      const acceptFriendship = await this.client
        .updateTable(this.tableName)
        .set({
          //@ts-ignore
          status_name,
          updated_at: todayUTCString,
        })
        .where('adder_id', '=', adder_id)
        .where('friend_id', '=', friend_id)
        .executeTakeFirst();

      return !!Number(acceptFriendship.numUpdatedRows);
    } catch (error) {
      if (error instanceof Error) {
        throw new DatabaseError(error);
      }
    }
  }
  async findPendingRequests(id: number) {
    try {
      const pendingRequests = await this.client
        .selectFrom(this.tableName)
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
        .where('friend_id', '=', id)
        .where('status_name', '=', 'pending')
        .execute();

      return pendingRequests;
    } catch (error) {
      if (error instanceof Error) {
        throw new DatabaseError(error);
      }
    }
  }
  async findSuggestProfile(profileId: number) {
    try {
      const suggestProfiles = await sql<
        Array<{
          friend_id: number;
          username: string;
          avatar_url: string | null;
          last_evaluation: number | null;
        }>
      >`
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
        throw new DatabaseError(error);
      }
    }
  }
}
