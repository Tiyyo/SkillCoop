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
import getDateUTC from '../app/utils/get-date-utc';
import authService from '../app/service/auth/auth'


function getRandomIntInclusive(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getIntUnused(intAlreadyUsed: number[]): number {
  const nbToPush = getRandomIntInclusive(1, 53);
  if (intAlreadyUsed.find((int) => int === nbToPush)) {
    getIntUnused(intAlreadyUsed);
  }
  intAlreadyUsed.push(nbToPush);
  return nbToPush;

}

async function seed() {
  logger.info('Start seeding');

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
    await Status.create({ name: item.name });
  }


  // create 1 admin
  // const admin = {
  //   email: 'admin@admin.com',
  //   password: 'admin',
  // };

  // const createdAdmin = await authService.createUser({
  //   email: admin.email,
  //   password: admin.password,
  // });

  // if (createdAdmin) {
  //   await User.update(createdAdmin.id, { verified: 1 });
  //   await Profile.create({ user_id: createdAdmin.id, username: 'admin' });
  // }

  // const test = {
  //   email: 'test@test.com',
  //   password: 'test',
  // };

  // const createdTest = await authService.createUser({
  //   email: test.email,
  //   password: test.password,
  // });
  // if (createdTest) {
  //   await User.update(createdTest.id, { verified: 1 });
  //   await Profile.create({ user_id: createdTest.id, username: 'test' });
  // }

  // const test2 = {
  //   email: 'test2@test.com',
  //   password: 'test2',
  // };

  // const createdTest2 = await authService.createUser({
  //   email: test2.email,
  //   password: test2.password,
  // });

  // if (createdTest2) {
  //   await User.update(createdTest2.id, { verified: 1 });
  //   await Profile.create({ user_id: createdTest2.id, username: 'test2' });
  // }

  const userToCreateInfos = [
    { email: 'admin@admin.com', password: 'admin', username: 'Tiyyo', date_of_birth: '1992-12-09', first_name: 'steeve', last_name: 'matou' },
    { email: 'haaland@haaland.com', password: 'haaland', username: 'Haaland', first_name: 'Erling', last_name: 'Haaland' },
    { email: 'mbappe@mbappe.com', password: 'mbappe', username: 'Mbappe', first_name: 'Kylian', last_name: 'Mbappe' },
    { email: 'bellingham@bellingham.com', password: 'bellingham', username: 'Bellingham', first_name: 'Jude', last_name: 'Bellingham' },
    { email: 'vinicius@vinicius.com', password: 'vinicius', username: 'Vinicius', first_name: 'Vinicius', last_name: 'Junior' },
    { email: 'saka@saka.com', password: 'saka', username: 'Saka', first_name: 'Bukayo', last_name: 'Saka' },
    { email: 'osimhen@osimhen.com', password: 'osimhen', username: 'Osimhen', first_name: 'Victor', last_name: 'Osimhen' },
    { email: 'musiala@musiala.com', password: 'musiala', username: 'Musiala', first_name: 'Jamal', last_name: 'Musiala' },
    { email: 'foden@foden.com', password: 'foden', username: 'Foden', first_name: 'Phil', last_name: 'Foden' },
    { email: 'kane@kane.com', password: 'kane', username: 'Kane', first_name: 'Harry', last_name: 'Kane' },
  ]

  for await (const infos of userToCreateInfos) {
    const user = await authService.createUser({
      email: infos.email,
      password: infos.password,
    });
    if (!user) return logger.error('Error while creating user');
    await User.update(user.id, { verified: 1 });

    const profile = await Profile.create({
      user_id: user.id,
      username: infos.username,
      first_name: infos.first_name,
      last_name: infos.last_name,
    });

    // console.log('Profile created', profile.id);
    await SkillFoot.create({
      pace: faker.number.int({ min: 50, max: 100 }),
      shooting: faker.number.int({ min: 50, max: 100 }),
      passing: faker.number.int({ min: 50, max: 100 }),
      dribbling: faker.number.int({ min: 50, max: 100 }),
      defending: faker.number.int({ min: 50, max: 100 }),
      rater_id: profile.id,
      reviewee_id: profile.id,
    });
  }

  // create 50 users
  const NB_USERS_TO_CREATE = 50;
  const arrayToIterateOn = new Array(NB_USERS_TO_CREATE).fill(1);
  //eslint-disable-next-line
  for await (const _ of arrayToIterateOn) {
    const user = await User.createUser({
      email: faker.internet.email(),
      password: faker.internet.password(),
    });

    const avatarUrl = faker.internet.avatar();

    await Image.create({ url: avatarUrl });

    const randomDate = faker.date.birthdate({ max: 2002, min: 1980 });
    const birthdate = getDateUTC(randomDate);

    const profile = await Profile.create({
      user_id: user.id,
      username: faker.internet.userName().toLowerCase(),
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      avatar_url: avatarUrl,
      date_of_birth: birthdate,
    });

    // console.log('Profile created', profile.id);
    await SkillFoot.create({
      pace: faker.number.int({ min: 10, max: 100 }),
      shooting: faker.number.int({ min: 10, max: 100 }),
      passing: faker.number.int({ min: 10, max: 100 }),
      dribbling: faker.number.int({ min: 10, max: 100 }),
      defending: faker.number.int({ min: 10, max: 100 }),
      rater_id: profile.id,
      reviewee_id: profile.id,
    });
  }
  // create friendship between users

  const twoAndThree = [2, 3];

  const dataPendingRequestsTest = twoAndThree.map((id) => {
    return {
      adder_id: 1,
      friend_id: id,
      status_name: 'pending',
    };
  });
  await Friendlist.createMany(dataPendingRequestsTest);


  const arrayFourtoThriteen = new Array(10).fill(1);
  const dataConfirmedRequests = arrayFourtoThriteen.map((_, index) => {
    return {
      adder_id: 1,
      friend_id: index + 4,
      status_name: 'confirmed',
    };
  });
  await Friendlist.createMany(dataConfirmedRequests);


  const array20 = new Array(20).fill(1);
  const dataPendingRequestsAdmin = array20.map((_, index) => {
    return {
      adder_id: index + 21,
      friend_id: 1,
      status_name: 'pending',
    };
  });
  await Friendlist.createMany(dataPendingRequestsAdmin);

  // create 5 past events
  const NB_EVENTS_TO_CREATE = 5;
  const arrayToIterateOnEvents = new Array(NB_EVENTS_TO_CREATE).fill(1);
  //eslint-disable-next-line
  for await (const _ of arrayToIterateOnEvents) {
    const randomDate = faker.date.past();
    const date = getDateUTC(randomDate);

    const eventId = await Event.create({
      date,
      duration: 90,
      location: faker.location.city(),
      required_participants: 10,
      organizer_id: 1,
      status_name: 'completed',
    });

    // add score to each event
    await Score.create({
      event_id: Number(eventId),
      score_team_1: faker.number.int({ min: 0, max: 20 }),
      score_team_2: faker.number.int({ min: 0, max: 20 }),
    });

    // add 10 participants to each event
    const NB_PARTICIPANTS_TO_CREATE = 10;
    const arrayToIterateOnParticipants = new Array(
      NB_PARTICIPANTS_TO_CREATE,
    ).fill(1);

    arrayToIterateOnParticipants.forEach(async (_, index) => {
      await Participant.create({
        event_id: eventId,
        profile_id: index + 1,
        team: index < 5 ? 1 : 2,
        status_name: 'confirmed',
      });
    });

  }

  // create 3 future events
  const NB_EVENTS_FUTURE_TO_CREATE = 3;
  const arrayToIterateOnFutureEvents = new Array(
    NB_EVENTS_FUTURE_TO_CREATE,
  ).fill(1);

  //eslint-disable-next-line
  for await (const _ of arrayToIterateOnFutureEvents) {
    const randomDate = faker.date.future();
    const date = getDateUTC(randomDate);

    const eventId = await Event.create({
      date,
      duration: 90,
      location: faker.location.city(),
      required_participants: 10,
      organizer_id: 1,
      status_name: 'full',
    });

    // add 10 participants to each event
    const NB_PARTICIPANTS_TO_CREATE = 10;
    const arrayToIterateOnParticipants = new Array(
      NB_PARTICIPANTS_TO_CREATE,
    ).fill(1);

    arrayToIterateOnParticipants.forEach(async (_, index) => {
      await Participant.create({
        event_id: Number(eventId),
        profile_id: index + 1,
        status_name: 'confirmed',
        team: index < 5 ? 1 : 2,
      });
    });
  }
  const NB_EVENTS_PAST_TO_CREATE_2 = 50;
  const arrayToIterateOnFutureEvents2 = new Array(
    NB_EVENTS_PAST_TO_CREATE_2,
  ).fill(1);

  //eslint-disable-next-line
  for await (const _ of arrayToIterateOnFutureEvents2) {
    const randomDate = faker.date.past();
    const date = getDateUTC(randomDate);
    const randomInt = getRandomIntInclusive(1, 53);

    const eventId = await Event.create({
      date,
      duration: 90,
      location: faker.location.city(),
      required_participants: 10,
      organizer_id: randomInt,
      status_name: 'completed',
    });

    await Score.create({
      event_id: Number(eventId),
      score_team_1: faker.number.int({ min: 0, max: 20 }),
      score_team_2: faker.number.int({ min: 0, max: 20 }),
    });

    await Participant.create({
      event_id: Number(eventId),
      profile_id: randomInt,
      status_name: 'confirmed',
      team: 1,
    });
    const intAlreadyUsed = [randomInt];

    // add 10 participants to each event
    const NB_PARTICIPANTS_TO_CREATE = 9;
    const arrayToIterateOnParticipants = new Array(
      NB_PARTICIPANTS_TO_CREATE,
    ).fill(1);

    getIntUnused(intAlreadyUsed);


    arrayToIterateOnParticipants.forEach(async (_, index) => {
      Participant.create({
        event_id: Number(eventId),
        profile_id: getIntUnused(intAlreadyUsed),
        status_name: 'confirmed',
        team: index < 4 ? 1 : 2,
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
    const date = getDateUTC(randomDate);
    const randomInt = getRandomIntInclusive(1, 53);

    const eventId = await Event.create({
      date,
      duration: 90,
      location: faker.location.city(),
      required_participants: 10,
      organizer_id: randomInt,
      status_name: 'full',
    });

    await Participant.create({
      event_id: Number(eventId),
      profile_id: randomInt,
      status_name: 'confirmed',
      team: 1,
    });
    const intAlreadyUsed = [randomInt];

    // add 10 participants to each event
    const NB_PARTICIPANTS_TO_CREATE = 9;
    const arrayToIterateOnParticipants = new Array(
      NB_PARTICIPANTS_TO_CREATE,
    ).fill(1);

    getIntUnused(intAlreadyUsed);

    arrayToIterateOnParticipants.forEach(async (_, index) => {
      await Participant.create({
        event_id: Number(eventId),
        profile_id: getIntUnused(intAlreadyUsed),
        status_name: 'confirmed',
        team: index < 4 ? 1 : 2,
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
    const date = getDateUTC(randomDate);
    const eventId = await Event.create({
      date,
      duration: 90,
      location: faker.location.city(),
      required_participants: 10,
      organizer_id: 1,
      status_name: 'open',
    });

    openParticipants.forEach(async (_, index) => {
      await Participant.create({
        event_id: Number(eventId),
        profile_id: index + 1,
        status_name: index < 3 ? 'confirmed' : 'pending',
      });
    });
  }

  logger.info('Database has been seed');
}

seed().catch((err) => {
  logger.error('Seeding has failed' + err);
});
