import { sql } from 'kysely';
import { Core } from './core.js';
import { getFormattedUTCTimestamp } from '@skillcoop/date-handler';
import { DB } from '../@types/database.js';
import { InsertObjectDB, UpdateObjectDB, tableNames } from '../@types/types.js';
import { InsertObject } from 'kysely';
import { db } from '../helpers/client.db.js';
import DatabaseError from '../helpers/errors/database.error.js';
import NotFoundError from '../helpers/errors/not-found.error.js';
import { userQueuePublisher } from '../publishers/user.publisher.js';

export class Profile extends Core<typeof tableNames.profile> {
  declare tableName: typeof tableNames.profile;

  constructor(client: typeof db) {
    super(client);
    this.tableName = tableNames.profile;
  }
  async find(id: number) {
    try {
      const [result] = await this.client
        .selectFrom('profile')
        .select([
          'profile_id',
          'avatar_url',
          'username',
          'date_of_birth',
          'first_name',
          'last_name',
          'last_evaluation',
          'location',
        ])
        .leftJoin('skill_foot', 'profile_id', 'skill_foot.reviewee_id')
        .innerJoin('user', 'user.id', 'profile.profile_id')
        .select(['user.email as email'])
        .select(({ fn }) => [
          'profile_id',
          fn.count('skill_foot.id').as('nb_review'),
        ])
        .where('profile_id', '=', id)
        .groupBy('profile_id')
        .execute();
      if (!result) return null;

      const nbAttendedEvents = await this.client
        .selectFrom('profile_on_event')
        .select(({ fn }) => [
          fn.count('profile_on_event.event_id').as('nb_attended_events'),
        ])
        .innerJoin('event', 'event.id', 'profile_on_event.event_id')
        .where('profile_on_event.profile_id', '=', result.profile_id)
        .where('event.status_name', '=', 'completed')
        .executeTakeFirst();

      const nbBonus = await this.client
        .selectFrom('event')
        .select(({ fn }) => [
          fn.count<number>('event.mvp_id').as('nb_mvp_bonus'),
        ])
        .select(({ fn }) => [
          fn.count<number>('event.best_striker_id').as('nb_best_striker_bonus'),
        ])
        .where((eb) =>
          eb('event.mvp_id', '=', result.profile_id).or(
            'event.best_striker_id',
            '=',
            result.profile_id,
          ),
        )
        .executeTakeFirst();

      const winningRate = await sql<{ winning_rate: number }>`
          SELECT      
            (SUM(CASE 
                WHEN (team = 1 AND score_team_1 > score_team_2) OR 
                     (team = 2 AND score_team_2 > score_team_1) 
                THEN 1 ELSE 0 
                END) * 1.0 / COUNT(event.id)) * 100  AS winning_rate
          FROM profile_on_event
          INNER JOIN event ON profile_on_event.event_id = event.id
          INNER JOIN score ON event.id = score.event_id
          WHERE profile_on_event.profile_id = ${id}
          AND profile_on_event.status_name = 'confirmed'`.execute(this.client);

      type ReturnTypeProfile = typeof result & {
        nb_attended_events: number;
        nb_bonus: number;
        winning_rate: number;
      };
      const profile: Partial<ReturnTypeProfile> = result;

      if (result) {
        profile.nb_attended_events =
          Number(nbAttendedEvents.nb_attended_events) ?? 0;
        profile.nb_bonus = Number(nbBonus) ?? 0;
        profile.winning_rate = Number(winningRate.rows[0].winning_rate) ?? 0;
      }
      return profile;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      if (error instanceof Error) {
        throw new DatabaseError(error);
      }
    }
  }
  async create(data: InsertObjectDB<typeof tableNames.profile>) {
    const todayUTCString = getFormattedUTCTimestamp();
    data.created_at = todayUTCString;

    try {
      const result = await this.client
        .insertInto('profile')
        .values(data as unknown as InsertObject<DB, typeof tableNames.profile>)
        .returning('profile_id')
        .executeTakeFirst();

      await userQueuePublisher({
        profile_id: data.profile_id,
        username: data.username,
        avatar: data.avatar_url,
        action: 'update',
      });

      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new DatabaseError(error);
      }
    }
  }
  async searchByUsername(
    username: string,
    userProfileId: number,
    page: number = 1,
  ) {
    const offset = (page - 1) * 10;
    try {
      const profiles = await sql<Profile>`
      SELECT 
        profile.profile_id,
        profile.avatar_url,
        profile.username,
        profile.date_of_birth,
        profile.last_evaluation,
        (SELECT 
          CASE 
            WHEN profile_on_profile.adder_id > 0 THEN 1
            ELSE 0
          END AS isTrue 
        FROM profile_on_profile
        WHERE (
          profile_on_profile.adder_id =${userProfileId} 
          AND profile_on_profile.friend_id = profile.profile_id
        ) OR (
          profile_on_profile.adder_id = profile.profile_id
         AND profile_on_profile.friend_id = ${userProfileId}
        )) AS relation_exist
    FROM profile
    LEFT JOIN skill_foot ON skill_foot.reviewee_id = profile.profile_id 
    WHERE relation_exist IS NULL
    AND profile.profile_id  <> ${userProfileId}
    AND profile.username LIKE ${`%${username.toLowerCase()}%`}
    GROUP BY profile.profile_id 
    LIMIT 20
    OFFSET ${offset}
`.execute(this.client);

      return profiles.rows;
    } catch (error) {
      if (error instanceof Error) {
        throw new DatabaseError(error);
      }
    }
  }
  async updateSyncChat(
    condition: UpdateObjectDB<typeof tableNames.profile>,
    updateObject: UpdateObjectDB<typeof tableNames.profile>,
  ) {
    const result = await this.updateOne(condition, updateObject);

    const mergeArgs = { ...condition, ...updateObject };
    if (mergeArgs.profile_id) {
      await userQueuePublisher({
        profile_id: mergeArgs.profile_id,
        username: mergeArgs.username,
        avatar: mergeArgs.avatar_url,
        action: 'update',
      });
    }
    return result;
  }
}
