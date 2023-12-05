//@ts-nocheck
import DatabaseError from '../helpers/errors/database.error';
import { sql } from 'kysely';
import { Core } from './core';
import NotFoundError from '../helpers/errors/not-found.error';
import { ProfileType } from '../@types/types';

// TODO define a type for Profile
// TODO fn is not type , need to find a way to type it other than any

export class Profile extends Core {
  tableName: string = 'profile';

  constructor(client: any) {
    //eslint-disable-line
    // eslint-disable-line
    super(client);
  }
  async findAll() {
    try {
      const result = await this.client
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
        .execute();

      return result;
    } catch (error) {
      throw new DatabaseError(error);
    }
  }
  async findOne(id: number) {
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
      .where('profile_id', '=', id)
      .execute();

    const [nbReview] = await this.client
      .selectFrom('skill_foot')
      .select(({ fn }) => [fn.count('skill_foot.id').as('nb_review')])
      .where('skill_foot.reviewee_id', '=', id)
      .execute();

    const [nbAttendedEvents] = await this.client
      .selectFrom('profile_on_event')
      .select(({ fn }) => [fn.count('profile_on_event.event_id').as('nb_attended_events')])
      .innerJoin('event', 'event.id', 'profile_on_event.event_id')
      .where('profile_on_event.profile_id', '=', id)
      .where('event.status_name', '=', 'completed')
      .execute();

    const [nbBonus] = await this.client
      .selectFrom('event')
      .select(({ fn }) => [fn.count('event.mvp_id').as('nb_mvp_bonus')])
      .select(({ fn }) => [fn.count('event.best_striker_id').as('nb_best_striker_bonus')])
      .where((eb) => eb('event.mvp_id', '=', id).or('event.best_striker_id', '=', id))
      .execute();

    let spreadProfile;

    if (profile) {
      spreadProfile = { ...profile, ...nbReview, ...nbAttendedEvents, ...nbBonus };
    }
    console.log(spreadProfile);
    return spreadProfile;
  }
  // TODO define a type for data
  async create(data: Record<string, string | number>) {
    try {
      const result = await this.client
        .insertInto('profile')
        .values({ ...data })
        .returning('id')
        .executeTakeFirst();

      return result;
    } catch (error) {
      throw new DatabaseError(error);
    }
  }
  // TODO define a type for data
  async updateProfile(data: { profile_id: number; avatar_url?: string }) {
    const { profile_id, ...rest } = data;
    const profileIdConvertedNumber = Number(profile_id);
    try {
      const result = await this.client
        .updateTable('profile')
        .set({
          ...rest,
        })
        .where('profile.id', '=', profileIdConvertedNumber)
        .executeTakeFirst();

      return !!result.numUpdatedRows;
    } catch (error) {
      throw new DatabaseError(error);
    }
  }
  async findByUserId(id: number) {
    try {
      const [profile] = await this.client
        .selectFrom('profile')
        .select([
          'profile.user_id',
          'profile.avatar_url',
          'profile.username',
          'profile.date_of_birth',
          'profile.first_name',
          'profile.last_name',
          'profile.location',
          'user.email as email',
          'profile.id as profile_id',
        ])
        .leftJoin('skill_foot', 'profile_id', 'skill_foot.reviewee_id')
        .innerJoin('user', 'user.id', 'profile.user_id')
        .select(({ fn }) => ['profile.id', fn.count('skill_foot.id').as('nb_review')])
        .where('profile.user_id', '=', id)
        .groupBy('profile.id')
        .execute();
      if (!profile) return null;

      const [nbAttendedEvents] = await this.client
        .selectFrom('profile_on_event')
        .select(({ fn }) => [fn.count('profile_on_event.event_id').as('nb_attended_events')])
        .innerJoin('event', 'event.id', 'profile_on_event.event_id')
        .where('profile_on_event.profile_id', '=', profile.profile_id)
        .where('event.status_name', '=', 'completed')
        .execute();

      const [nbBonus] = await this.client
        .selectFrom('event')
        .select(({ fn }) => [fn.count('event.mvp_id').as('nb_mvp_bonus')])
        .select(({ fn }) => [fn.count('event.best_striker_id').as('nb_best_striker_bonus')])
        .where((eb) =>
          eb('event.mvp_id', '=', profile.profile_id).or(
            'event.best_striker_id',
            '=',
            profile.profile_id,
          ),
        )
        .execute();

      if (profile) {
        profile.nb_attended_events = nbAttendedEvents.nb_attended_events ?? 0;
        profile.nb_bonus = nbBonus ?? 0;
      }
      return profile;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new DatabaseError(error);
    }
  }
  async findManyByUsername(username: string, userProfileId: number, page: number = 1) {
    const offset = (page - 1) * 10;

    try {
      const profiles = await sql<ProfileType>`
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
