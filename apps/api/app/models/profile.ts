import DatabaseError from '../helpers/errors/database.error'
import computeGbRating from '../utils/compute-gb-rating'
import { Core } from './core'

// TODO define a type for Profile

export class Profile extends Core {
  tableName: string = 'profile'

  constructor(client: any) {
    super(client)
  }
  async findAll() {
    try {
      const result = await this.client
        .selectFrom('profile')
        .select(['profile.user_id', 'profile.avatar_url', 'profile.username', 'profile.date_of_birth', 'profile.id as profile_id'])
        .innerJoin('skill_foot', 'profile.id', 'skill_foot.reviewee_id')
        .select(({ fn }) => [
          'profile.id',
          fn.count('profile.id').as('nb_review'),
          fn.avg('skill_foot.pace').as('avg_pace'),
          fn.avg('skill_foot.shooting').as('avg_shooting'),
          fn.avg('skill_foot.passing').as('avg_passing'),
          fn.avg('skill_foot.dribbling').as('avg_dribbling'),
          fn.avg('skill_foot.defending').as('avg_defending'),
        ])
        .groupBy('profile.id')
        .execute()

      result.forEach((profile) => {
        const scores = {
          avg_pace: profile.avg_pace,
          avg_shooting: profile.avg_shooting,
          avg_passing: profile.avg_passing,
          avg_dribbling: profile.avg_dribbling,
          avg_defending: profile.avg_defending
        }
        profile.gb_rating = computeGbRating(scores)
      })
      return result
    } catch (error) {
      throw new DatabaseError(error)
    }
  }
  async findOne( id : number) {
    const infos = await this.client
      .selectFom('profile')
      .select(['profile.user_id', 'profile.avatar_url', 'profile.username', 'profile.date_of_birth', 'profile.id as profile_id'])
      .where('profile_id', "=", id)
      .execute()

  const skills = await this.client
      .selectFrom('profile')
      .innerJoin('skill_foot', 'profile.id', 'skill_foot.reviewee_id')
      .select(({ fn }) => [
          'profile.id',
          fn.count('profile.id').as('nb_review'),
          fn.avg('skill_foot.pace').as('avg_pace'),
          fn.avg('skill_foot.shooting').as('avg_shooting'),
          fn.avg('skill_foot.passing').as('avg_passing'),
          fn.avg('skill_foot.dribbling').as('avg_dribbling'),
          fn.avg('skill_foot.defending').as('avg_defending'),
        ])
        .where('profile_id', "=", id)
        .groupBy('profile.id')
        .execute()

    skills[0].gb_rating = computeGbRating({
        avg_pace: skills[0].avg_pace,
        avg_shooting: skills[0].avg_shooting,
        avg_passing: skills[0].avg_passing,
        avg_dribbling: skills[0].avg_dribbling,
        avg_defending: skills[0].avg_defending,
      })
    
      const profile = {
        ...infos[0], skills : skills[0] 
      }

    return profile
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
  async create(data) {

    const result = await this.client
      .insertInto('profile')
      .values(
        { ...data }
      )
      .executeTakeFirst()

    return !!result.numInsertedRows
  }
  // TODO define a type for data
  async update(data) {
    const { profile_d, ...rest } = data

    const result = await this.client
      .updateTable('profile')
      .set({
        ...rest
      })
      .where('user_id', "=", profile_d)
      .executeTakeFirst()
    return result
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
    async findByUserId( id : number) {
    const infos = await this.client
      .selectFom('profile')
      .select(['profile.user_id', 'profile.avatar_url', 'profile.username', 'profile.date_of_birth', 'profile.id as profile_id'])
      .where('profile.user_id', "=", id)
      .execute()

  const skills = await this.client
      .selectFrom('profile')
      .innerJoin('skill_foot', 'profile.id', 'skill_foot.reviewee_id')
      .select(({ fn }) => [
          'profile.id',
          fn.count('profile.id').as('nb_review'),
          fn.avg('skill_foot.pace').as('avg_pace'),
          fn.avg('skill_foot.shooting').as('avg_shooting'),
          fn.avg('skill_foot.passing').as('avg_passing'),
          fn.avg('skill_foot.dribbling').as('avg_dribbling'),
          fn.avg('skill_foot.defending').as('avg_defending'),
        ])
        .where('profile.user_id', "=", id)
        .groupBy('profile.id')
        .execute()

    skills[0].gb_rating = computeGbRating({
        avg_pace: skills[0].avg_pace,
        avg_shooting: skills[0].avg_shooting,
        avg_passing: skills[0].avg_passing,
        avg_dribbling: skills[0].avg_dribbling,
        avg_defending: skills[0].avg_defending,
      })
    
      const profile = {
        ...infos[0], skills : skills[0] 
      }

    return profile
  }
}
