import '../app/helpers/env.load.js';
import logger from '../app/helpers/logger.js';
import { faker } from '@faker-js/faker';
import { user as User } from '../app/models/index.js';
import { profile as Profile } from '../app/models/index.js';
import { event as Event } from '../app/models/index.js';
import { status as Status } from '../app/models/index.js';
import { profileOnEvent as Participant } from '../app/models/index.js';
import { score as Score } from '../app/models/index.js';
import { friendslist as Friendlist } from '../app/models/index.js';
import { skillFoot as SkillFoot } from '../app/models/index.js';
import { notificationType as NotificationType } from '../app/models/index.js';
import authService from '../app/service/auth/auth.js';
import {
  getFormattedUTCTimestamp,
  getUTCString,
} from '@skillcoop/date-handler';
import { uploadLocalFile } from '../app/service/upload/upload-local-file.js';

async function seed() {
  logger.info('Start seeding');
  const todayUTCString = getFormattedUTCTimestamp();
  /* add all status */
  /* add all notification type */
  const status = [
    { name: 'pending' },
    { name: 'confirmed' },
    { name: 'declined' },
    { name: 'open' },
    { name: 'full' },
    { name: 'completed' },
    { name: 'cancelled' },
  ];
  const notificationTypes = [
    { name: 'event' },
    { name: 'friend' },
    { name: 'message' },
    { name: 'system' },
  ];

  const queriesStatusGenerated = status.map((item) => {
    return Status.createOne({ name: item.name, created_at: todayUTCString });
  });
  const queriesNotificationTypeGenerated = notificationTypes.map((item) => {
    return NotificationType.createOne({
      name: item.name,
      created_at: todayUTCString,
    });
  });
  /*await Promise.all(queriesStatusGenerated);*/

  await Promise.all([
    ...queriesNotificationTypeGenerated,
    ...queriesStatusGenerated,
  ]);

  /* Create user and profile */

  const userToCreateInfos = [
    {
      email: 'admin@admin.com',
      password: 'admin',
      username: 'Tiyyo',
      date_of_birth: '1992-12-09',
      first_name: 'Steeve',
      last_name: 'Matou',
      image_filename: 'admin.jpg',
    },
    {
      email: 'john.doe@example.com',
      password: 'johndoe',
      username: 'Joe',
      date_of_birth: '1994-09-14',
      first_name: 'John',
      last_name: 'Doe',
    },
    {
      email: 'haaland@haaland.com',
      password: 'haaland',
      username: 'Haaland',
      first_name: 'Erling',
      last_name: 'Haaland',
      image_filename: 'haaland.webp',
    },
    {
      email: 'mbappe@mbappe.com',
      password: 'mbappe',
      username: 'Mbappe',
      first_name: 'Kylian',
      last_name: 'Mbappe',
      image_filename: 'mbappe.webp',
    },
    {
      email: 'bellingham@bellingham.com',
      password: 'bellingham',
      username: 'Bellingham',
      first_name: 'Jude',
      last_name: 'Bellingham',
      image_filename: 'bellingham.jpg',
    },
    {
      email: 'vinicius@vinicius.com',
      password: 'vinicius',
      username: 'Vinicius',
      first_name: 'Vinicius',
      last_name: 'Junior',
      image_filename: 'vinicius.webp',
    },
    {
      email: 'saka@saka.com',
      password: 'saka',
      username: 'Saka',
      first_name: 'Bukayo',
      last_name: 'Saka',
      image_filename: 'saka.jpg',
    },
    {
      email: 'osimhen@osimhen.com',
      password: 'osimhen',
      username: 'Osimhen',
      first_name: 'Victor',
      last_name: 'Osimhen',
      image_filename: 'osihmen.jpeg',
    },
    {
      email: 'musiala@musiala.com',
      password: 'musiala',
      username: 'Musiala',
      first_name: 'Jamal',
      last_name: 'Musiala',
      image_filename: 'musiala.webp',
    },
    {
      email: 'foden@foden.com',
      password: 'foden',
      username: 'Foden',
      first_name: 'Phil',
      last_name: 'Foden',
      image_filename: 'foden.jpeg',
    },
    {
      email: 'kane@kane.com',
      password: 'kane',
      username: 'Kane',
      first_name: 'Harry',
      last_name: 'Kane',
      image_filename: 'kane.jpg',
    },
  ];

  for await (const infos of userToCreateInfos) {
    const user = await authService.createUser({
      email: infos.email,
      password: infos.password,
    });
    if (!user) return logger.error('Error while creating user');
    await User.updateOne({ id: user.id }, { verified: 1 });

    let avatarUrl = null;
    if (infos.image_filename) {
      const propImage = await uploadLocalFile(infos.image_filename);
      if (!propImage) return logger.error('Error while uploading image');
      avatarUrl = propImage.link;
    }

    const profile = await Profile.create({
      profile_id: user.id,
      username: infos.username,
      first_name: infos.first_name,
      last_name: infos.last_name,
      avatar_url: avatarUrl,
      created_at: todayUTCString,
    });

    if (!profile) return;

    await SkillFoot.createOne({
      pace: faker.number.int({ min: 50, max: 100 }),
      shooting: faker.number.int({ min: 50, max: 100 }),
      passing: faker.number.int({ min: 50, max: 100 }),
      dribbling: faker.number.int({ min: 50, max: 100 }),
      defending: faker.number.int({ min: 50, max: 100 }),
      rater_id: profile.profile_id,
      reviewee_id: profile.profile_id,
      created_at: todayUTCString,
    });
  }

  /* create relation between users */
  const pendingRequestFriend = [1, 3, 4, 5, 6];

  const queriesPendingFriendRequest = pendingRequestFriend.map((id) => {
    return {
      adder_id: 2,
      friend_id: id,
      status_name: 'pending',
      created_at: todayUTCString,
    };
  });
  await Friendlist.createMany(queriesPendingFriendRequest);

  const confirmedFriend = [7, 8, 9];

  const dataConfirmedRequests = confirmedFriend.map((id) => {
    return {
      adder_id: 2,
      friend_id: id,
      status_name: 'confirmed',
      created_at: todayUTCString,
    };
  });
  await Friendlist.createMany(dataConfirmedRequests);

  const pendingRequestReceived = [10, 11];

  const dataConfirmedRequestsReceived = pendingRequestReceived.map((id) => {
    return {
      adder_id: id,
      friend_id: 2,
      status_name: 'pending',
      created_at: todayUTCString,
    };
  });
  await Friendlist.createMany(dataConfirmedRequestsReceived);

  const nbOfUser = userToCreateInfos.length;
  const arrToIterateOverUsers = new Array(nbOfUser).fill(1);
  const dataconfirmedAdmin = arrToIterateOverUsers.reduce(
    (acc, _curr, index) => {
      if (index !== 1) {
        acc.push({
          adder_id: 1,
          friend_id: index + 1,
          status_name: 'confirmed',
          created_at: todayUTCString,
        });
      }
      return acc;
    },
    [],
  );
  await Friendlist.createMany(dataconfirmedAdmin);

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
  // eslint-disable-next-line
  for await (const _ of arrayToIterateOnEvents) {
    const randomDate = faker.date.past();
    const date = getUTCString(randomDate);

    const event = await Event.create({
      date,
      duration: 90,
      location: faker.location.city(),
      required_participants: 10,
      organizer_id: 2,
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

  // // create 3 future events organized by admin
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

  /* create 3 future full events organize by john doe */
  //eslint-disable-next-line
  for await (const _ of arrayToIterateOnFutureEvents) {
    const randomDate = faker.date.future();
    const date = getUTCString(randomDate);

    const event = await Event.create({
      date,
      duration: 90,
      location: faker.location.city(),
      required_participants: 10,
      organizer_id: 2,
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
  //eslint-disable-next-line
  for await (const _ of arrayToIterateOnOpenEvents) {
    const randomDate = faker.date.future();
    const date = getUTCString(randomDate);
    const event = await Event.create({
      date,
      duration: 90,
      location: faker.location.city(),
      required_participants: 10,
      organizer_id: 2,
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
