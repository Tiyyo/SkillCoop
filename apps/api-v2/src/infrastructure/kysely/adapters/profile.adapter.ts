import { Inject, Injectable } from '@nestjs/common';
import { Kysely, sql } from 'kysely';
import { CreateProfileInterface } from 'src/application/dto/create-profile.dto';
import { SearchProfileParams } from 'src/application/dto/search-profile.dto';
import { ProfileRepository } from 'src/domain/repositories/profile.repository';
import { DB } from '../database.type';
import { ProfileEntity } from 'src/domain/entities/profile.entity';
import { addCreatedISOStringDate } from 'src/infrastructure/utils/add-date-object';
import { InsertObjectDB, TableNames, tableNames } from 'src/config/types';
import { CoreAdapter } from './core.adapter';
import { DatabaseException } from '../database.exception';

@Injectable()
export class ProfileAdapter
  extends CoreAdapter<'profile'>
  implements ProfileRepository {
  declare tableNames: keyof TableNames;
  constructor(@Inject('dbClient') protected dbClient: Kysely<DB>) {
    super(dbClient);
    this.tableName = 'profile';
  }

  async create(data: CreateProfileInterface): Promise<boolean> {
    const dataWithDate = addCreatedISOStringDate(data);

    try {
      const result = await this.dbClient
        .insertInto('profile')
        .values(
          dataWithDate as unknown as InsertObjectDB<typeof tableNames.profile>,
        )
        .returning('profile_id')
        .executeTakeFirst();
      return !!result.profile_id;
    } catch (error) {
      if (error instanceof Error) {
        throw new DatabaseException(error);
      }
    }
  }
  async search(searchParams: SearchProfileParams) {
    const offset = (searchParams.page - 1) * 10;
    try {
      const profiles = await sql<ProfileEntity>`
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
          profile_on_profile.adder_id =${searchParams.userProfileId} 
          AND profile_on_profile.friend_id = profile.profile_id
        ) OR (
          profile_on_profile.adder_id = profile.profile_id
         AND profile_on_profile.friend_id = ${searchParams.userProfileId}
        )) AS relation_exist
    FROM profile
    LEFT JOIN skill_foot ON skill_foot.reviewee_id = profile.profile_id 
    WHERE relation_exist IS NULL
    AND profile.profile_id  <> ${searchParams.userProfileId}
    AND profile.username LIKE ${`%${searchParams.username.toLowerCase()}%`}
    GROUP BY profile.profile_id 
    LIMIT 20
    OFFSET ${offset}
    `.execute(this.dbClient);

      return profiles.rows;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error('DatabaseError : ' + error.message);
      }
    }
  }
  async findWithNbReview(profileId: string) {
    try {
      const result = await this.client
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
          fn.count<number>('skill_foot.id').as('nb_review'),
        ])
        .where('profile_id', '=', profileId)
        .groupBy('profile_id')
        .executeTakeFirst();
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new DatabaseException(error);
      }
    }
  }
}
