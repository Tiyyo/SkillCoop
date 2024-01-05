import logger from '../app/helpers/logger';
import { faker } from '@faker-js/faker';
import { user as User } from '../app/models/index';
import { profile as Profile } from '../app/models/index';
import { image as Image } from '../app/models/index';
import { event as Event } from '../app/models/index';
import { status as Status } from '../app/models/index';
import { profileOnEvent as Participant } from '../app/models/index';
import { score as Score } from '../app/models/index';
import { friendslist as Friendlist } from '../app/models/index';
import { skillFoot as SkillFoot } from '../app/models/index';
import { notificationType as NotificationType } from '../app/models/index';
import authService from '../app/service/auth/auth';
import { getFormattedUTCTimestamp, getUTCString } from 'date-handler';

function getRandomIntInclusive(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getIntUnused(intAlreadyUsed: number[]): number {
  const nbToPush = getRandomIntInclusive(1, 24);
  if (intAlreadyUsed.find((int) => int == nbToPush)) {
    return getIntUnused(intAlreadyUsed);
  } else {
    return nbToPush;
  }
  // intAlreadyUsed.push(nbToPush);
}

async function seed() {
  logger.info('Start seeding');
  const todayUTCString = getFormattedUTCTimestamp();
  // create status
  const status = [
    { name: 'pending' },
    { name: 'confirmed' },
    { name: 'declined' },
    { name: 'open' },
    { name: 'full' },
    { name: 'completed' },
    { name: 'cancelled' },
  ];

  for await (const item of status) {
    await Status.createOne({ name: item.name, created_at: todayUTCString });
  }

  const notificationTypes = [
    { name: 'event' },
    { name: 'friend' },
    { name: 'message' },
    { name: 'system' },
  ];

  for await (const item of notificationTypes) {
    await NotificationType.createOne({
      name: item.name,
      created_at: todayUTCString,
    });
  }

  const userToCreateInfos = [
    {
      email: 'admin@admin.com',
      password: 'admin',
      username: 'Tiyyo',
      date_of_birth: '1992-12-09',
      first_name: 'Steeve',
      last_name: 'Matou',
    },
    {
      email: 'haaland@haaland.com',
      password: 'haaland',
      username: 'Haaland',
      first_name: 'Erling',
      last_name: 'Haaland',
    },
    {
      email: 'mbappe@mbappe.com',
      password: 'mbappe',
      username: 'Mbappe',
      first_name: 'Kylian',
      last_name: 'Mbappe',
    },
    {
      email: 'bellingham@bellingham.com',
      password: 'bellingham',
      username: 'Bellingham',
      first_name: 'Jude',
      last_name: 'Bellingham',
    },
    {
      email: 'vinicius@vinicius.com',
      password: 'vinicius',
      username: 'Vinicius',
      first_name: 'Vinicius',
      last_name: 'Junior',
    },
    {
      email: 'saka@saka.com',
      password: 'saka',
      username: 'Saka',
      first_name: 'Bukayo',
      last_name: 'Saka',
    },
    {
      email: 'osimhen@osimhen.com',
      password: 'osimhen',
      username: 'Osimhen',
      first_name: 'Victor',
      last_name: 'Osimhen',
    },
    {
      email: 'musiala@musiala.com',
      password: 'musiala',
      username: 'Musiala',
      first_name: 'Jamal',
      last_name: 'Musiala',
    },
    {
      email: 'foden@foden.com',
      password: 'foden',
      username: 'Foden',
      first_name: 'Phil',
      last_name: 'Foden',
    },
    {
      email: 'kane@kane.com',
      password: 'kane',
      username: 'Kane',
      first_name: 'Harry',
      last_name: 'Kane',
    },
  ];

  for await (const infos of userToCreateInfos) {
    const user = await authService.createUser({
      email: infos.email,
      password: infos.password,
    });
    if (!user) return logger.error('Error while creating user');
    await User.updateOne({ id: user.id }, { verified: 1 });

    const profile = await Profile.create({
      user_id: user.id,
      username: infos.username,
      first_name: infos.first_name,
      last_name: infos.last_name,
      active_notification: faker.number.int({ min: 0, max: 1 }),
      created_at: todayUTCString,
    });

    if (!profile) return;

    await SkillFoot.createOne({
      pace: faker.number.int({ min: 50, max: 100 }),
      shooting: faker.number.int({ min: 50, max: 100 }),
      passing: faker.number.int({ min: 50, max: 100 }),
      dribbling: faker.number.int({ min: 50, max: 100 }),
      defending: faker.number.int({ min: 50, max: 100 }),
      rater_id: profile.id,
      reviewee_id: profile.id,
      created_at: todayUTCString,
    });
  }

  // create 15 users + profile with avatar + skillfoot
  let NB_USERS_TO_CREATE = 10;
  const arrayToIterateOn = new Array(NB_USERS_TO_CREATE).fill(1);
  //eslint-disable-next-line
  for await (const _ of arrayToIterateOn) {
    const user = await User.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
    });
    if (!user) return logger.error('Failed to create user');

    const avatarUrl = faker.internet.avatar();
    await Image.createOne({ url: avatarUrl, created_at: todayUTCString });

    const randomDate = faker.date.birthdate({ max: 2002, min: 1980 });
    const birthdate = getUTCString(randomDate);

    const profile = await Profile.create({
      user_id: user.id,
      username: faker.internet.userName().toLowerCase(),
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      avatar_url: avatarUrl,
      date_of_birth: birthdate,
      created_at: todayUTCString,
    });

    if (!profile) return;

    await SkillFoot.createOne({
      pace: faker.number.int({ min: 10, max: 100 }),
      shooting: faker.number.int({ min: 10, max: 100 }),
      passing: faker.number.int({ min: 10, max: 100 }),
      dribbling: faker.number.int({ min: 10, max: 100 }),
      defending: faker.number.int({ min: 10, max: 100 }),
      rater_id: profile.id,
      reviewee_id: profile.id,
      created_at: todayUTCString,
    });
  }

  NB_USERS_TO_CREATE = 750;
  const arrayToIterateOnTwo = new Array(NB_USERS_TO_CREATE).fill(1);
  //eslint-disable-next-line
  for await (const _ of arrayToIterateOnTwo) {
    const user = await User.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
    });
    if (!user) return logger.error('Failed to create user');

    const randomDate = faker.date.birthdate({ max: 2002, min: 1980 });
    const birthdate = getUTCString(randomDate);

    const profile = await Profile.create({
      user_id: user.id,
      username: faker.internet.userName().toLowerCase(),
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      date_of_birth: birthdate,
      created_at: todayUTCString,
    });

    if (!profile) return;

    await SkillFoot.createOne({
      pace: faker.number.int({ min: 10, max: 100 }),
      shooting: faker.number.int({ min: 10, max: 100 }),
      passing: faker.number.int({ min: 10, max: 100 }),
      dribbling: faker.number.int({ min: 10, max: 100 }),
      defending: faker.number.int({ min: 10, max: 100 }),
      rater_id: profile.id,
      reviewee_id: profile.id,
      created_at: todayUTCString,
    });
  }

  // create friendship between users
  const twoAndThree = [2, 3, 4, 5, 6, 7, 8, 9, 10];

  const dataPendingRequestsTest = twoAndThree.map((id) => {
    return {
      adder_id: 1,
      friend_id: id,
      status_name: 'pending',
      created_at: todayUTCString,
    };
  });
  await Friendlist.createMany(dataPendingRequestsTest);

  const arrayFourtoThriteen = new Array(10).fill(1);
  const dataConfirmedRequests = arrayFourtoThriteen.map((_, index) => {
    return {
      adder_id: 1,
      friend_id: index + 11,
      status_name: 'confirmed',
      created_at: todayUTCString,
    };
  });
  await Friendlist.createMany(dataConfirmedRequests);

  const array20 = new Array(20).fill(1);
  const dataPendingRequestsAdmin = array20.map((_, index) => {
    return {
      adder_id: index + 21,
      friend_id: 1,
      status_name: 'pending',
      created_at: todayUTCString,
    };
  });
  await Friendlist.createMany(dataPendingRequestsAdmin);

  // // create 5 past events organize by admin
  const NB_EVENTS_TO_CREATE = 5;
  const arrayToIterateOnEvents = new Array(NB_EVENTS_TO_CREATE).fill(1);
  //eslint-disable-next-line
  for await (const _ of arrayToIterateOnEvents) {
    const randomDate = faker.date.past();
    const date = getUTCString(randomDate);

    const event = await Event.create({
      date,
      duration: 90,
      location: faker.location.city(),
      required_participants: 10,
      organizer_id: 1,
      status_name: 'completed',
      created_at: todayUTCString,
    });
    if (!event) return logger.error('Failed to create event');

    // add score to each event
    await Score.createOne({
      event_id: Number(event.id),
      score_team_1: faker.number.int({ min: 0, max: 20 }),
      score_team_2: faker.number.int({ min: 0, max: 20 }),
      created_at: todayUTCString,
    });

    // add 10 participants to each event
    const NB_PARTICIPANTS_TO_CREATE = 10;
    const arrayToIterateOnParticipants = new Array(
      NB_PARTICIPANTS_TO_CREATE,
    ).fill(1);

    arrayToIterateOnParticipants.forEach(async (_, index) => {
      await Participant.createOne({
        profile_id: index + 1,
        event_id: event.id,
        team: index < 5 ? 1 : 2,
        status_name: 'confirmed',
        created_at: todayUTCString,
      });
    });
  }

  // // create 3 future events
  const NB_EVENTS_FUTURE_TO_CREATE = 3;
  const arrayToIterateOnFutureEvents = new Array(
    NB_EVENTS_FUTURE_TO_CREATE,
  ).fill(1);

  //eslint-disable-next-line
  for await (const _ of arrayToIterateOnFutureEvents) {
    const randomDate = faker.date.future();
    const date = getUTCString(randomDate);

    const event = await Event.create({
      date,
      duration: 90,
      location: faker.location.city(),
      required_participants: 10,
      organizer_id: 1,
      status_name: 'full',
      created_at: todayUTCString,
    });
    if (!event) return logger.error('Failed to create event');
    // add 10 participants to each event
    const NB_PARTICIPANTS_TO_CREATE = 10;
    const arrayToIterateOnParticipants = new Array(
      NB_PARTICIPANTS_TO_CREATE,
    ).fill(1);

    arrayToIterateOnParticipants.forEach(async (_, index) => {
      await Participant.createOne({
        event_id: event.id,
        profile_id: index + 1,
        status_name: 'confirmed',
        team: index < 5 ? 1 : 2,
        created_at: todayUTCString,
      });
    });
  }

  // create 50 past events
  const NB_EVENTS_PAST_TO_CREATE_2 = 1000;
  const arrayToIterateOnFutureEvents2 = new Array(
    NB_EVENTS_PAST_TO_CREATE_2,
  ).fill(1);

  //eslint-disable-next-line
  for await (const _ of arrayToIterateOnFutureEvents2) {
    const randomDate = faker.date.past();
    const date = getUTCString(randomDate);
    const organizerId = getRandomIntInclusive(1, 24);

    const event = await Event.create({
      date,
      duration: 90,
      location: faker.location.city(),
      required_participants: 10,
      organizer_id: organizerId,
      status_name: 'completed',
      created_at: todayUTCString,
    });
    if (!event) return logger.error('Failed to create event');

    await Score.createOne({
      event_id: event.id,
      score_team_1: faker.number.int({ min: 0, max: 20 }),
      score_team_2: faker.number.int({ min: 0, max: 20 }),
      created_at: todayUTCString,
    });

    await Participant.createOne({
      event_id: event.id,
      profile_id: organizerId,
      status_name: 'confirmed',
      team: 1,
      created_at: todayUTCString,
    });
    const intAlreadyUsed = [organizerId];

    // add 10 participants to each event
    const NB_PARTICIPANTS_TO_CREATE = 9;
    const arrayToIterateOnParticipants = new Array(
      NB_PARTICIPANTS_TO_CREATE,
    ).fill(1);

    arrayToIterateOnParticipants.forEach(async (_, index) => {
      const unuserInt = getIntUnused(intAlreadyUsed);
      if (!unuserInt) return logger.error('Failed to get an unused int');
      intAlreadyUsed.push(unuserInt);
      Participant.createOne({
        event_id: event.id,
        profile_id: unuserInt,
        status_name: 'confirmed',
        team: index < 4 ? 1 : 2,
        created_at: todayUTCString,
      });
    });
  }

  const NB_EVENTS_PAST_TO_CREATE_3 = 50;
  const arrayToIterateOnFutureEvents3 = new Array(
    NB_EVENTS_PAST_TO_CREATE_3,
  ).fill(1);

  //eslint-disable-next-line
  for await (const _ of arrayToIterateOnFutureEvents3) {
    const randomDate = faker.date.past();
    const date = getUTCString(randomDate);
    const randomInt = getRandomIntInclusive(1, 24);

    const event = await Event.create({
      date,
      duration: 90,
      location: faker.location.city(),
      required_participants: 10,
      organizer_id: randomInt,
      status_name: 'full',
      created_at: todayUTCString,
    });
    if (!event) return logger.error('Failed to create event');

    await Participant.createOne({
      event_id: event.id,
      profile_id: randomInt,
      status_name: 'confirmed',
      team: 1,
      created_at: todayUTCString,
    });
    const intAlreadyUsed = [randomInt];

    // add 10 participants to each event
    const NB_PARTICIPANTS_TO_CREATE = 9;
    const arrayToIterateOnParticipants = new Array(
      NB_PARTICIPANTS_TO_CREATE,
    ).fill(1);

    getIntUnused(intAlreadyUsed);

    arrayToIterateOnParticipants.forEach(async (_, index) => {
      const unuserInt = getIntUnused(intAlreadyUsed);
      if (!unuserInt) return logger.error('Failed to get an unused int');
      intAlreadyUsed.push(unuserInt);

      await Participant.createOne({
        event_id: event.id,
        profile_id: unuserInt,
        status_name: 'confirmed',
        team: index < 4 ? 1 : 2,
        created_at: todayUTCString,
      });
    });
  }

  // create 2 open events
  const NB_EVENTS_OPEN_TO_CREATE = 2;
  const arrayToIterateOnOpenEvents = new Array(NB_EVENTS_OPEN_TO_CREATE).fill(
    1,
  );
  const openParticipants = [1, 1, 1, 1, 1, 1];

  //eslint-disable-next-line
  for await (const _ of arrayToIterateOnOpenEvents) {
    const randomDate = faker.date.future();
    const date = getUTCString(randomDate);
    const event = await Event.create({
      date,
      duration: 90,
      location: faker.location.city(),
      required_participants: 10,
      organizer_id: 1,
      status_name: 'open',
      created_at: todayUTCString,
    });
    if (!event) return logger.error('Failed to create event');
    openParticipants.forEach(async (_, index) => {
      await Participant.createOne({
        event_id: event.id,
        profile_id: index + 1,
        status_name: index < 3 ? 'confirmed' : 'pending',
        created_at: todayUTCString,
      });
    });
  }

  logger.info('Database has been seed');
}

seed().catch((err) => {
  logger.error('Seeding has failed' + err);
});
