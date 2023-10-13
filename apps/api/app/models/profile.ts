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
          "profile.first_name",
          "profile.last_name",
          "profile.location",
          "profile.id as profile_id",
        ])
        .execute();

      return result;
    } catch (error) {
      throw new DatabaseError(error);
    }
  }
  async findOne(id: number) {
    const profile = await this.client
      .selectFrom("profile")
      .select([
        "profile.user_id",
        "profile.avatar_url",
        "profile.username",
        "profile.date_of_birth",
        "profile.first_name",
        "profile.last_name",
        "profile.location",
        "profile.id as profile_id",
      ])
      .innerJoin("skill_foot", "profile.id", "skill_foot.reviewee_id")
      .select(({ fn }) => [
        "profile.id",
        fn.count("skill_foot.id").as("nb_review")
      ])
      .where("profile_id", "=", id)
      .groupBy("profile.id")
      .execute();

    const nbAttendedEvents = await this.client
      .selectFrom("profile_on_event")
      .select(({ fn }) => [
        fn.count("profile_on_event.id").as("nb_attended_events"),
      ])
      .innerJoin("event", "event.id", "profile_on_event.event_id")
      .where("profile_on_event.profile_id", "=", id)
      .where("event.status_name", "=", "completed")
      .execute();

    const nbBonus = await this.client
      .selectFrom("event")
      .select(({ fn }) => [(
        fn.count("event.mvp_id").as("nb_mvp_bonus")
      )])
      .select(({ fn }) => [(
        fn.count("event.best_striker_id").as("nb_best_striker_bonus")
      )])
      .where((eb) =>
        eb('event.mvp_id', '=', id).or('event.best_striker_id', '=', id)
      )
      .execute();

    profile[0].nb_attended_events = nbAttendedEvents[0].nb_attended_events;
    profile[0].nb_bonus = nbBonus[0];
    return profile[0];
  }
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
    const profileIdConvertedNumber = Number(profile_id);

    const result = await this.client
      .updateTable("profile")
      .set({
        ...rest,
      })
      .where("user_id", "=", profileIdConvertedNumber)
      .executeTakeFirst();

    return !!result.numUpdatedRows
  }
  async findByUserId(id: number) {
    const profile = await this.client
      .selectFrom("profile")
      .select([
        "profile.user_id",
        "profile.avatar_url",
        "profile.username",
        "profile.date_of_birth",
        "profile.first_name",
        "profile.last_name",
        "profile.location",
        "user.email as email",
        "profile.id as profile_id",
      ])
      .innerJoin("user", "user.id", "profile.user_id")
      .innerJoin("skill_foot", "profile.id", "skill_foot.reviewee_id")
      .select(({ fn }) => [
        "profile.id",
        fn.count("skill_foot.id").as("nb_review")
      ])
      .where("profile_id", "=", id)
      .groupBy("profile.id")
      .execute();

    const nbAttendedEvents = await this.client
      .selectFrom("profile_on_event")
      .select(({ fn }) => [
        fn.count("profile_on_event.id").as("nb_attended_events"),
      ])
      .innerJoin("event", "event.id", "profile_on_event.event_id")
      .where("profile_on_event.profile_id", "=", id)
      .where("event.status_name", "=", "completed")
      .execute();

    const nbBonus = await this.client
      .selectFrom("event")
      .select(({ fn }) => [(
        fn.count("event.mvp_id").as("nb_mvp_bonus")
      )])
      .select(({ fn }) => [(
        fn.count("event.best_striker_id").as("nb_best_striker_bonus")
      )])
      .where((eb) =>
        eb('event.mvp_id', '=', id).or('event.best_striker_id', '=', id)
      )
      .execute();

    profile[0].nb_attended_events = nbAttendedEvents[0].nb_attended_events;
    profile[0].nb_bonus = nbBonus[0];
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
`.execute(this.client)
    return profiles.rows
  }
}
