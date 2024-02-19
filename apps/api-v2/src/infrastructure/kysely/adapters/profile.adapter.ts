import { Inject } from '@nestjs/common';
import { Kysely, sql } from 'kysely';
import { CreateProfileDTO } from 'src/application/dto/create-profile.dto';
import { SearchProfileParams } from 'src/application/dto/search-profile.dto';
import { UpdateProfileDTO } from 'src/application/dto/update-profile.dto';
import { ProfileRepository } from 'src/domain/repositories/profile.repository';
import { DB } from '../database.type';
import { ProfileEntity } from 'src/domain/entities/profile.entity';
import { addCreatedISOStringDate } from 'src/infrastructure/utils/add-date-object';
import { InsertObjectDB, tableNames } from 'src/config/types';

export class ProfileAdapter implements ProfileRepository {
  constructor(@Inject('dbClient') protected dbClient: Kysely<DB>) { }

  async createOne(data: CreateProfileDTO): Promise<boolean> {
    const dataWithDate = addCreatedISOStringDate(data);

    try {
      const result = await this.dbClient
        .insertInto('profile')
        .values(
          dataWithDate as unknown as InsertObjectDB<typeof tableNames.profile>,
        )
        .returning('profile_id')
        .executeTakeFirst();

      // await userQueuePublisher({
      //   profile_id: data.profile_id,
      //   username: data.username,
      //   avatar: data.avatar_url,
      //   action: 'update',
      // });

      return true;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error('DatabaseError : ' + error.message);
        // throw new DatabaseError(error);
      }
    }
    return true;
  }
  async getOne(id: number) {
    return {
      profile_id: id,
      username: 'test',
      date_of_birth: '1992-12-12',
      avatar_url: 'https://www.google.com',
      email: 'john.doe@doe.com',
      first_name: 'John',
      last_name: 'Doe',
      location: 'Paris',
      nb_events: 10,
      gb_rating: 5,
      nb_review: 20,
      nb_best_striker_bonus: 10,
      nb_mvp_bonus: 10,
      nb_attended_events: 5,
      relation_exists: 1,
      winning_rate: 0.5,
      last_evaluation: 4,
    };
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
    AND profile.username LIKE ${`%${searchParams.search.toLowerCase()}%`}
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
  async updateProfileImage(id: string, image: string): Promise<boolean> {
    return true;
  }
  async updateOne(data: UpdateProfileDTO): Promise<boolean> {
    const result = data;
    console.log('ProfileAdapter.updateOne', result);
    return true;
  }
}
