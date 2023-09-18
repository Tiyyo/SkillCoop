import { array } from "zod";
import logger from "../app/helpers/logger";
import { faker } from '@faker-js/faker';
import { user as User } from '../app/models/index'
import { profile as Profile } from '../app/models/index'
import { image as Image } from '../app/models/index'
import getDateUTC from "../app/utils/get-date-utc";

async function seed() {
  logger.info('Start seeding')
  // create 10 users
  const NB_USERS_TO_CREATE = 10
  const arrayToIterateOn = new Array(NB_USERS_TO_CREATE).fill(1)

  for await (const _ of arrayToIterateOn) {
    const user = await User.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
    })

    const avatarUrl = faker.internet.avatar()

    await Image.create({ url: avatarUrl })

    const randomDate = faker.date.birthdate({ max: 2002, min: 1980 })
    const birthdate = getDateUTC(randomDate)

    await Profile.create({
      user_id: user.id,
      username: faker.internet.userName(),
      avatar_url: avatarUrl,
      date_of_birth: birthdate,
    })
  }


  logger.info("Database has been seed")
}


seed().catch((err) => {
  logger.error("Seeding has failed" + err)
})