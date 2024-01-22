import DatabaseError from '#errors/database.error';
import { sql } from 'kysely';
import { Core } from './core.js';
import NotFoundError from '#errors/not-found.error';
import { getFormattedUTCTimestamp } from '@skillcoop/date-handler';
import { DB } from '../@types/database.js';
import { db } from '#helpers/client.db';
import { InsertObjectDB, UpdateObjectDB, tableNames } from '../@types/types.js';
import { InsertObject } from 'kysely';
import { userQueuePublisher } from '#publishers/user.publisher';

// TODO define a type for Profile

export class Profile extends Core<typeof tableNames.profile> {
  declare tableName: typeof tableNames.profile;

  constructor(client: typeof db) {
    super(client);
    this.tableName = tableNames.profile;
  }
  //TODO : change name of this method
  // async findAll() {
  //   try {
  //     const result = await this.client
  //       .selectFrom('profile')
  //       .select([
  //         'profile.user_id',
  //         'profile.avatar_url',
  //         'profile.username',
  //         'profile.date_of_birth',
  //         'profile.first_name',
  //         'profile.last_name',
  //         'profile.location',
  //         'profile.profile_id as profile_id',
  //       ])
  //       .execute();

  //     return result;
  //   } catch (error) {
  //     throw new DatabaseError(error);
  //   }
  // }
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

      const [nbAttendedEvents] = await this.client
        .selectFrom('profile_on_event')
        .select(({ fn }) => [
          fn.count('profile_on_event.event_id').as('nb_attended_events'),
        ])
        .innerJoin('event', 'event.id', 'profile_on_event.event_id')
        .where('profile_on_event.profile_id', '=', result.profile_id)
        .where('event.status_name', '=', 'completed')
        .execute();

      const [nbBonus] = await this.client
        .selectFrom('event')
        .select(({ fn }) => [fn.count('event.mvp_id').as('nb_mvp_bonus')])
        .select(({ fn }) => [
          fn.count('event.best_striker_id').as('nb_best_striker_bonus'),
        ])
        .where((eb) =>
          eb('event.mvp_id', '=', result.profile_id).or(
            'event.best_striker_id',
            '=',
            result.profile_id,
          ),
        )
        .execute();

      type ReturnTypeProfile = typeof result & {
        nb_attended_events: number;
        nb_bonus: number;
      };
      const profile: Partial<ReturnTypeProfile> = result;

      if (result) {
        profile.nb_attended_events =
          Number(nbAttendedEvents.nb_attended_events) ?? 0;
        profile.nb_bonus = Number(nbBonus) ?? 0;
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
  // TODO define a type for data
  // TODO change name of this method
  // async create(data: InsertObjectOrList<DB, typeof tableNames.profile>) {
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
  // async findByUserId(id: number) {
  //   try {
  //     const [result] = await this.client
  //       .selectFrom('profile')
  //       .select([
  //         'profile_id',
  //         'avatar_url',
  //         'username',
  //         'date_of_birth',
  //         'first_name',
  //         'last_name',
  //         'location',
  //       ])
  //       .leftJoin('skill_foot', 'profile_id', 'skill_foot.reviewee_id')
  //       .innerJoin('user', 'user.id', 'profile.profile_id')
  //       .select(['user.email as email'])
  //       .select(({ fn }) => [
  //         'profile_id',
  //         fn.count('skill_foot.id').as('nb_review'),
  //       ])
  //       .where('profile_id', '=', id)
  //       .groupBy('profile_id')
  //       .execute();
  //     if (!result) return null;

  //     const [nbAttendedEvents] = await this.client
  //       .selectFrom('profile_on_event')
  //       .select(({ fn }) => [
  //         fn.count('profile_on_event.event_id').as('nb_attended_events'),
  //       ])
  //       .innerJoin('event', 'event.id', 'profile_on_event.event_id')
  //       .where('profile_on_event.profile_id', '=', result.profile_id)
  //       .where('event.status_name', '=', 'completed')
  //       .execute();

  //     const [nbBonus] = await this.client
  //       .selectFrom('event')
  //       .select(({ fn }) => [fn.count('event.mvp_id').as('nb_mvp_bonus')])
  //       .select(({ fn }) => [
  //         fn.count('event.best_striker_id').as('nb_best_striker_bonus'),
  //       ])
  //       .where((eb) =>
  //         eb('event.mvp_id', '=', result.profile_id).or(
  //           'event.best_striker_id',
  //           '=',
  //           result.profile_id,
  //         ),
  //       )
  //       .execute();

  //     type ReturnTypeProfile = typeof result & {
  //       nb_attended_events: number;
  //       nb_bonus: number;
  //     };
  //     const profile: Partial<ReturnTypeProfile> = result;

  //     if (result) {
  //       profile.nb_attended_events =
  //         Number(nbAttendedEvents.nb_attended_events) ?? 0;
  //       profile.nb_bonus = Number(nbBonus) ?? 0;
  //     }
  //     return profile;
  //   } catch (error) {
  //     if (error instanceof NotFoundError) {
  //       throw error;
  //     }
  //     if (error instanceof Error) {
  //       throw new DatabaseError(error);
  //     }
  //   }
  // }
  async searchByUsername(
    username: string,
    userProfileId: number,
    page: number = 1,
  ) {
    const offset = (page - 1) * 10;

    try {
      const profiles = await sql<Profile>`
      SELECT 
        profile.profile_id ,
        profile.avatar_url,
        profile.username,
        profile.date_of_birth,
        profile.profile_id AS profile_id,
        profile.last_evaluation,
        (SELECT CAST (profile_on_profile.adder_id AS BOOLEAN)
        FROM profile_on_profile
        WHERE profile_on_profile.adder_id = ${userProfileId}
        AND profile_on_profile.friend_id = profile_id.profile_id  
        ) AS relation_exist  
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
