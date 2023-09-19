import { array } from "zod";
import logger from "../app/helpers/logger";
import { faker } from '@faker-js/faker';
import { user as User } from '../app/models/index'
import { profile as Profile } from '../app/models/index'
import { image as Image } from '../app/models/index'
import { event as Event } from '../app/models/index'
import { status as Status } from '../app/models/index'
import { profileOnEvent as Participant } from "../app/models/index";
import { score as Score } from "../app/models/index";
import getDateUTC from "../app/utils/get-date-utc";
import authService from "../app/service/auth/auth";

async function seed() {
  logger.info('Start seeding')

  // create status
  const status = [
    { name: 'pending' },
    { name: 'confirmed' },
    { name: 'declined' },
    { name: 'open' },
    { name: 'full' },
    { name: 'completed' },
    { name: 'cancelled' },
  ]

  for await (const item of status) {
    await Status.create({ name: item.name })
  }

  // create 1 admin
  const admin = {
    email: 'admin@admin.com',
    password: 'admin',
  }

  const createdAdmin = await authService.createUser({ email: admin.email, password: admin.password })
  await User.update(createdAdmin.id, { verified: 1 })
  await Profile.create({ user_id: createdAdmin.id, username: 'admin' })

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

  // create 5 past events
  const NB_EVENTS_TO_CREATE = 5
  const arrayToIterateOnEvents = new Array(NB_EVENTS_TO_CREATE).fill(1)

  for await (const _ of arrayToIterateOnEvents) {
    const randomDate = faker.date.past()
    const date = getDateUTC(randomDate)

    const eventId = await Event.create({
      date,
      duration: 90,
      location: faker.location.city(),
      required_participants: 10,
      organizer_id: createdAdmin.id,
      status_name: 'completed',
    })

    // add score to each event
    await Score.create({
      event_id: Number(eventId),
      score_team_1: faker.number.int({ min: 0, max: 20 }),
      score_team_2: faker.number.int({ min: 0, max: 20 }),
    })

    // add 10 participants to each event
    const NB_PARTICIPANTS_TO_CREATE = 10
    const arrayToIterateOnParticipants = new Array(NB_PARTICIPANTS_TO_CREATE).fill(1)

    arrayToIterateOnParticipants.forEach(async (_, index) => {
      await Participant.create({
        event_id: eventId,
        profile_id: index + 1,
        team: index < 6 ? 1 : 2,
        status_name: 'confirmed',
      })
    })
  }

  // create 3 future events
  const NB_EVENTS_FUTURE_TO_CREATE = 3
  const arrayToIterateOnFutureEvents = new Array(NB_EVENTS_FUTURE_TO_CREATE).fill(1)

  for await (const _ of arrayToIterateOnFutureEvents) {
    const randomDate = faker.date.future()
    const date = getDateUTC(randomDate)

    const eventId = await Event.create({
      date,
      duration: 90,
      location: faker.location.city(),
      required_participants: 10,
      organizer_id: createdAdmin.id,
      status_name: 'full',
    })

    // add 10 participants to each event
    const NB_PARTICIPANTS_TO_CREATE = 10
    const arrayToIterateOnParticipants = new Array(NB_PARTICIPANTS_TO_CREATE).fill(1)

    arrayToIterateOnParticipants.forEach(async (_, index) => {
      await Participant.create({
        event_id: Number(eventId),
        profile_id: index + 1,
        status_name: 'confirmed',
        team: index < 6 ? 1 : 2,
      })
    })
  }

  // create 2 open events
  const NB_EVENTS_OPEN_TO_CREATE = 2
  const arrayToIterateOnOpenEvents = new Array(NB_EVENTS_OPEN_TO_CREATE).fill(1)
  const openParticipants = [1, 1, 1, 1, 1, 1,]

  for await (const _ of arrayToIterateOnOpenEvents) {
    const randomDate = faker.date.future()
    const date = getDateUTC(randomDate)

    const eventId = await Event.create({
      date,
      duration: 90,
      location: faker.location.city(),
      required_participants: 10,
      organizer_id: createdAdmin.id,
      status_name: 'open',
    })

    openParticipants.forEach(async (_, index) => {
      await Participant.create({
        event_id: Number(eventId),
        profile_id: index + 1,
        status_name: index < 3 ? 'confirmed' : 'pending',
      })
    })
  }

  logger.info("Database has been seed")
}


seed().catch((err) => {
  logger.error("Seeding has failed" + err)
})