import DatabaseError from "../helpers/errors/database.error";
import computeGbRating from "../utils/compute-gb-rating";
import { sql } from "kysely"
import { Core } from "./core";

// TODO define a type for Profile

export class Profile extends Core {
  tableName: string = "profile";

  constructor(client: any) {
    super(client);
  }
  async findAll() {
    try {
      const result = await this.client
        .selectFrom("profile")
        .select([
          "profile.user_id",
          "profile.avatar_url",
          "profile.username",
          "profile.date_of_birth",
          "profile.id as profile_id",
        ])
        .innerJoin("skill_foot", "profile.id", "skill_foot.reviewee_id")
        .select(({ fn }) => [
          "profile.id",
          fn.count("skill_foot.id").as("nb_review"),
          fn.avg("skill_foot.pace").as("avg_pace"),
          fn.avg("skill_foot.shooting").as("avg_shooting"),
          fn.avg("skill_foot.passing").as("avg_passing"),
          fn.avg("skill_foot.dribbling").as("avg_dribbling"),
          fn.avg("skill_foot.defending").as("avg_defending"),
        ])
        .groupBy("profile.id")
        .execute();

      result.forEach((profile) => {
        const scores = {
          avg_pace: profile.avg_pace,
          avg_shooting: profile.avg_shooting,
          avg_passing: profile.avg_passing,
          avg_dribbling: profile.avg_dribbling,
          avg_defending: profile.avg_defending,
        };
        profile.gb_rating = computeGbRating(scores);
      });
      return result;
    } catch (error) {
      throw new DatabaseError(error);
    }
  }
  async findOne(id: number) {
    const profile = await this.client
      .selectFom("profile")
      .select([
        "profile.user_id",
        "profile.avatar_url",
        "profile.username",
        "profile.date_of_birth",
        "profile.id as profile_id",
      ])
      .leftJoin("skill_foot", "profile.id", "skill_foot.reviewee_id")
      .select(({ fn }) => [
        "profile.id",
        fn.count("skill_foot.id").as("nb_review"),
        fn.avg("skill_foot.pace").as("avg_pace"),
        fn.avg("skill_foot.shooting").as("avg_shooting"),
        fn.avg("skill_foot.passing").as("avg_passing"),
        fn.avg("skill_foot.dribbling").as("avg_dribbling"),
        fn.avg("skill_foot.defending").as("avg_defending"),
      ])
      .where("profile_id", "=", id)
      .groupBy("profile.id")
      .execute();

    profile[0].gb_rating = computeGbRating({
      avg_pace: profile[0].avg_pace,
      avg_shooting: profile[0].avg_shooting,
      avg_passing: profile[0].avg_passing,
      avg_dribbling: profile[0].avg_dribbling,
      avg_defending: profile[0].avg_defending,
    }) || null;

    return profile[0];
  }
  // async findOne(id: number) {

  //   try {
  //     const result = await this.client
  //       .selectFrom('profile')
  //       .select(['profile.user_id', 'profile.avatar_url', 'profile.username', 'profile.date_of_birth', 'profile.id as profile_id'])
  //       .innerJoin('skill_foot', 'profile.id', 'skill_foot.reviewee_id')
  //       //@ts-ignore
  //       .select(({ fn }) => [
  //         'profile.id',
  //         fn.count('profile.id').as('nb_review'),
  //         fn.avg('skill_foot.pace').as('avg_pace'),
  //         fn.avg('skill_foot.shooting').as('avg_shooting'),
  //         fn.avg('skill_foot.passing').as('avg_passing'),
  //         fn.avg('skill_foot.dribbling').as('avg_dribbling'),
  //         fn.avg('skill_foot.defending').as('avg_defending'),
  //       ])
  //       .where('profile_id', "=", id)
  //       .groupBy('profile.id')
  //       .execute()

  //     result[0].gb_rating = computeGbRating({
  //       avg_pace: result[0].avg_pace,
  //       avg_shooting: result[0].avg_shooting,
  //       avg_passing: result[0].avg_passing,
  //       avg_dribbling: result[0].avg_dribbling,
  //       avg_defending: result[0].avg_defending,
  //     })

  //     return result[0]
  //   } catch (error) {
  //     throw new DatabaseError(error)
  //   }

  // }
  // TODO define a type for data
  async create(data: Record<string, any>) {
    const result = await this.client
      .insertInto("profile")
      .values({ ...data })
      .executeTakeFirst();

    return !!result.numInsertedRows;
  }
  // TODO define a type for data
  async update(data) {
    const { profile_id, ...rest } = data;

    const result = await this.client
      .updateTable("profile")
      .set({
        ...rest,
      })
      .where("user_id", "=", profile_d)
      .executeTakeFirst();
    return result;
  }
  // async findByUserId(id: number) {
  //   try {
  //     const result = await this.client
  //       .selectFrom('profile')
  //       .select(['profile.user_id', 'profile.avatar_url', 'profile.username', 'profile.date_of_birth', 'profile.id as profile_id'])
  //       .innerJoin('skill_foot', 'profile.id', 'skill_foot.reviewee_id')
  //       //@ts-ignore
  //       .select(({ fn }) => [
  //         'profile.id',
  //         fn.count('profile.id').as('nb_review'),
  //         fn.avg('skill_foot.pace').as('avg_pace'),
  //         fn.avg('skill_foot.shooting').as('avg_shooting'),
  //         fn.avg('skill_foot.passing').as('avg_passing'),
  //         fn.avg('skill_foot.dribbling').as('avg_dribbling'),
  //         fn.avg('skill_foot.defending').as('avg_defending'),
  //       ])
  //       .where('profile.user_id', "=", id)
  //       .groupBy('profile.id')
  //       .execute()
  //     return result[0]
  //   } catch (error) {
  //     throw new DatabaseError(error)
  //   }
  // }
  async findByUserId(id: number) {
    const profile = await this.client
      .selectFrom("profile")
      .select([
        "profile.user_id",
        "profile.avatar_url",
        "profile.username",
        "profile.date_of_birth",
        "profile.id as profile_id",
      ])
      .leftJoin("skill_foot", "profile.id", "skill_foot.reviewee_id")
      .select(({ fn }) => [
        "profile.id",
        fn.count("skill_foot.id").as("nb_review"),
        fn.avg("skill_foot.pace").as("avg_pace"),
        fn.avg("skill_foot.shooting").as("avg_shooting"),
        fn.avg("skill_foot.passing").as("avg_passing"),
        fn.avg("skill_foot.dribbling").as("avg_dribbling"),
        fn.avg("skill_foot.defending").as("avg_defending"),
      ])
      .where("profile.user_id", "=", id)
      .groupBy("profile.id")
      .execute();

    profile[0].gb_rating = computeGbRating({
      avg_pace: profile[0].avg_pace,
      avg_shooting: profile[0].avg_shooting,
      avg_passing: profile[0].avg_passing,
      avg_dribbling: profile[0].avg_dribbling,
      avg_defending: profile[0].avg_defending,
    });

    return profile[0];
  }

  //   (SUM(avg_passing, avg_pace, avg_shooting, avg_dribbling, avg_defending) / 5) 
  // AS bg_rating,
  async findManyByUsername(username: string, userProfileId: number, page: number = 1) {
    const offset = (page - 1) * 10
    const profiles = await sql<any>`
      SELECT 
        profile.user_id,
        profile.avatar_url,
        profile.username,
        profile.date_of_birth,
        profile.id AS profile_id,
        COUNT(skill_foot.id) AS nb_review,
        AVG(skill_foot.passing) AS avg_passing,
        AVG(skill_foot.pace) AS avg_pace,
        AVG(skill_foot.shooting) AS avg_shooting,
        AVG(skill_foot.dribbling) AS avg_dribbling,
        AVG(skill_foot.defending) AS avg_defending,
        (
          (AVG(skill_foot.passing) +
          AVG(skill_foot.pace) +
          AVG(skill_foot.shooting) +
          AVG(skill_foot.dribbling) +
          AVG(skill_foot.defending)) / 5
        ) AS gb_rating,
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
`.execute(this.client)
    return profiles.rows

  }
}
