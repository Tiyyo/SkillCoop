import DatabaseError from '../helpers/errors/database.error';
import { sql } from 'kysely';
import { Core } from './core';
import NotFoundError from '../helpers/errors/not-found.error';
import { getFormattedUTCTimestamp } from 'date-handler';
import { DB, tableNames } from '../@types/database';
import { db } from '../helpers/client.db';
/*eslint-disable-next-line */
import { InsertObjectOrList } from 'kysely/dist/cjs/parser/insert-values-parser';

// TODO define a type for Profile

export class Profile extends Core<typeof tableNames.profile> {
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
  //         'profile.id as profile_id',
  //       ])
  //       .execute();

  //     return result;
  //   } catch (error) {
  //     throw new DatabaseError(error);
  //   }
  // }

  async find(id: number) {
    const [profile] = await this.client
      .selectFrom('profile')
      .select([
        'profile.user_id',
        'profile.active_notification',
        'profile.avatar_url',
        'profile.username',
        'profile.date_of_birth',
        'profile.first_name',
        'profile.last_name',
        'profile.location',
        'profile.last_evaluation',
        'profile.id as profile_id',
      ])
      .where('profile.id', '=', id)
      .execute();

    const [nbReview] = await this.client
      .selectFrom('skill_foot')
      .select(({ fn }) => [fn.count('skill_foot.id').as('nb_review')])
      .where('skill_foot.reviewee_id', '=', id)
      .execute();

    const [nbAttendedEvents] = await this.client
      .selectFrom('profile_on_event')
      .select(({ fn }) => [
        fn.count('profile_on_event.event_id').as('nb_attended_events'),
      ])
      .innerJoin('event', 'event.id', 'profile_on_event.event_id')
      .where('profile_on_event.profile_id', '=', id)
      .where('event.status_name', '=', 'completed')
      .execute();

    const [nbBonus] = await this.client
      .selectFrom('event')
      .select(({ fn }) => [fn.count('event.mvp_id').as('nb_mvp_bonus')])
      .select(({ fn }) => [
        fn.count('event.best_striker_id').as('nb_best_striker_bonus'),
      ])
      .where((eb) =>
        eb('event.mvp_id', '=', id).or('event.best_striker_id', '=', id),
      )
      .execute();

    let spreadProfile;

    if (profile) {
      spreadProfile = {
        ...profile,
        ...nbReview,
        ...nbAttendedEvents,
        ...nbBonus,
      };
    }
    return spreadProfile;
  }
  // TODO define a type for data
  // TODO change name of this method
  async create(data: InsertObjectOrList<DB, typeof tableNames.profile>) {
    const todayUTCString = getFormattedUTCTimestamp();
    //@ts-ignore
    data.created_at = todayUTCString;

    try {
      const result = await this.client
        .insertInto('profile')
        .values(data)
        .returning('id')
        .executeTakeFirst();

      return result;
    } catch (error) {
      throw new DatabaseError(error);
    }
  }
  // TODO define a type for data
  // async updateProfile(data: { profile_id: number; avatar_url?: string }) {
  //   const todayUTCString = getFormattedUTCTimestamp();
  //   //@ts-ignore
  //   data.updated_at = todayUTCString;

  //   const { profile_id, ...rest } = data;
  //   const profileIdConvertedNumber = Number(profile_id);
  //   try {
  //     const result = await this.client
  //       .updateTable('profile')
  //       .set({
  //         ...rest,
  //       })
  //       .where('profile.id', '=', profileIdConvertedNumber)
  //       .executeTakeFirst();

  //     return !!result.numUpdatedRows;
  //   } catch (error) {
  //     throw new DatabaseError(error);
  //   }
  // }
  async findByUserId(id: number) {
    try {
      const [result] = await this.client
        .selectFrom('profile')
        .select([
          'profile.user_id',
          'profile.avatar_url',
          'profile.username',
          'profile.date_of_birth',
          'profile.first_name',
          'profile.last_name',
          'profile.location',
          'profile.id as profile_id',
        ])
        .leftJoin('skill_foot', 'profile.id', 'skill_foot.reviewee_id')
        .innerJoin('user', 'user.id', 'profile.user_id')
        .select(['user.email as email'])
        .select(({ fn }) => [
          'profile.id',
          fn.count('skill_foot.id').as('nb_review'),
        ])
        .where('profile.user_id', '=', id)
        .groupBy('profile.id')
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
      throw new DatabaseError(error);
    }
  }
  async findManyByUsername(
    username: string,
    userProfileId: number,
    page: number = 1,
  ) {
    const offset = (page - 1) * 10;

    try {
      const profiles = await sql<Profile>`
      SELECT 
        profile.user_id,
        profile.avatar_url,
        profile.username,
        profile.date_of_birth,
        profile.id AS profile_id,
        profile.last_evaluation,
        (SELECT CAST (profile_on_profile.adder_id AS BOOLEAN)
        FROM profile_on_profile
        WHERE profile_on_profile.adder_id = ${userProfileId}
        AND profile_on_profile.friend_id = profile.id
        ) AS relation_exist  
    FROM profile
    LEFT JOIN skill_foot ON skill_foot.reviewee_id = profile.id
    WHERE relation_exist IS NULL 
    AND profile.id <> ${userProfileId}
    AND profile.username LIKE ${`%${username.toLowerCase()}%`}
    GROUP BY profile.id
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
}
