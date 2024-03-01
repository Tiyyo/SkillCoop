import { faker } from '@faker-js/faker';
import {
  getFormattedUTCTimestamp,
  getUTCString,
} from '@skillcoop/date-handler';
import * as path from 'path';
import { Kysely, ParseJSONResultsPlugin, SqliteDialect } from 'kysely';
import { DB } from '../kysely/database.type.js';
import { Inject, Logger } from '@nestjs/common';
import * as crypto from 'crypto';
import { PasswordHashInterface } from 'src/application/services/hash.service';
import { ProducerUserMessageService } from '../publishers/user.publisher';
import { ProducerEventMessageService } from '../publishers/event.publisher';
import { BcryptAdapterService } from '../service/bcrypt.adapter.service';
import * as SQLite from 'better-sqlite3';
import * as fs from 'fs';
import * as csv from 'csv-parser';

function getRandomIntInclusive(max: number) {
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - 2) + 1);
}

export const convertCsvToJson = (filePath: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    /*eslint-disable-next-line */
    const results: Array<any> = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        const json = JSON.stringify(results, null, 2);
        resolve(json);
      })
      .on('error', (err) => reject(err));
    return results;
  });
};

export class Seed {
  today: string;

  declare nbPlaygroundAvaiaible: number;

  declare usersCreated: string[];

  avaiableStatus = [
    { name: 'pending' },
    { name: 'confirmed' },
    { name: 'declined' },
    { name: 'open' },
    { name: 'full' },
    { name: 'completed' },
    { name: 'cancelled' },
    { name: 'requested' },
    { name: 'refused' },
  ];
  avaiableNotificationTypes = [
    { name: 'event' },
    { name: 'friend' },
    { name: 'message' },
    { name: 'system' },
  ];

  userToCreate = [
    {
      id: crypto.randomUUID(),
      email: 'admin@admin.com',
      password: 'admin',
      username: 'Tiyyo',
      date_of_birth: '1992-12-09',
      first_name: 'Steeve',
      last_name: 'Matou',
      image_filename: 'admin.jpg',
    },
    {
      id: crypto.randomUUID(),
      email: 'john.doe@example.com',
      password: 'johndoe',
      username: 'Joe',
      date_of_birth: '1994-09-14',
      first_name: 'John',
      last_name: 'Doe',
    },
    {
      id: crypto.randomUUID(),
      email: 'haaland@haaland.com',
      password: 'haaland',
      username: 'Haaland',
      first_name: 'Erling',
      last_name: 'Haaland',
      image_filename: 'haaland.webp',
      avatar_url:
        'https://d2zfpkhvac288y.cloudfront.net/0f94c9818ea150690580fbcbeb7c61af_haaland.webp_w100',
    },
    {
      id: crypto.randomUUID(),
      email: 'mbappe@mbappe.com',
      password: 'mbappe',
      username: 'Mbappe',
      first_name: 'Kylian',
      last_name: 'Mbappe',
      image_filename: 'mbappe.webp',
      avatar_url:
        'https://d2zfpkhvac288y.cloudfront.net/51377110c960276bdf5cb0ccccc9d1e5_mbappe.webp_w100',
    },
    {
      id: crypto.randomUUID(),
      email: 'bellingham@bellingham.com',
      password: 'bellingham',
      username: 'Bellingham',
      first_name: 'Jude',
      last_name: 'Bellingham',
      image_filename: 'bellingham.jpg',
      avatar_url:
        'https://d2zfpkhvac288y.cloudfront.net/4907a5864cbc9f624056a1ae0cbf620c_bellingham.jpg_w100',
    },
    {
      id: crypto.randomUUID(),
      email: 'vinicius@vinicius.com',
      password: 'vinicius',
      username: 'Vinicius',
      first_name: 'Vinicius',
      last_name: 'Junior',
      image_filename: 'vinicius.webp',
      avatar_url:
        'https://d2zfpkhvac288y.cloudfront.net/19c6770f33960e7e33d1913b48f30a7e_vinicius.webp_w100',
    },
    {
      id: crypto.randomUUID(),
      email: 'saka@saka.com',
      password: 'saka',
      username: 'Saka',
      first_name: 'Bukayo',
      last_name: 'Saka',
      image_filename: 'saka.jpg',
      avatar_url:
        'https://d2zfpkhvac288y.cloudfront.net/d905b1dc68e10807b83f145691d5670a_saka.jpg_w100',
    },
    {
      id: crypto.randomUUID(),
      email: 'osimhen@osimhen.com',
      password: 'osimhen',
      username: 'Osimhen',
      first_name: 'Victor',
      last_name: 'Osimhen',
      image_filename: 'osihmen.jpeg',
      avatar_url:
        'https://d2zfpkhvac288y.cloudfront.net/22fb2d32d95ab0c7907f11a270a1d673_osihmen.jpeg_w100',
    },
    {
      id: crypto.randomUUID(),
      email: 'musiala@musiala.com',
      password: 'musiala',
      username: 'Musiala',
      first_name: 'Jamal',
      last_name: 'Musiala',
      image_filename: 'musiala.webp',
      avatar_url:
        'https://d2zfpkhvac288y.cloudfront.net/17c4e5149760db92cd768cfd652bf0c2_musiala.webp_w100',
    },
    {
      id: crypto.randomUUID(),
      email: 'foden@foden.com',
      password: 'foden',
      username: 'Foden',
      first_name: 'Phil',
      last_name: 'Foden',
      image_filename: 'foden.jpeg',
      avatar_url:
        'https://d2zfpkhvac288y.cloudfront.net/f80c8dcf9e54f72ce7db9064f89cb6b9_foden.jpeg_w100',
    },
    {
      id: crypto.randomUUID(),
      email: 'kane@kane.com',
      password: 'kane',
      username: 'Kane',
      first_name: 'Harry',
      last_name: 'Kane',
      image_filename: 'kane.jpg',
      avatar_url:
        'https://d2zfpkhvac288y.cloudfront.net/0ccafd6079693d223fabe669d55d7b8a_kane.jpg_w100',
    },
  ];

  tenParticipants = new Array(10).fill(1);

  producerUserMessageService: ProducerUserMessageService =
    new ProducerUserMessageService();

  producerEventMessageService: ProducerEventMessageService =
    new ProducerEventMessageService();

  constructor(
    @Inject('dbClient') private dbClient: Kysely<DB>,
    private readonly logger: Logger,
    @Inject('PasswordService')
    private readonly passwordService: PasswordHashInterface,
  ) {
    this.today = getFormattedUTCTimestamp();
  }

  async status() {
    const createStatus = this.avaiableStatus.map((item) => {
      return { name: item.name, created_at: this.today };
    });
    try {
      await this.dbClient.insertInto('status').values(createStatus).execute();
    } catch (error) {
      this.logger.error('Error while seeding status ' + error.message);
    }
  }

  async notificationType() {
    const createNotificationType = this.avaiableNotificationTypes.map(
      (item) => {
        return { name: item.name, created_at: this.today };
      },
    );
    try {
      await this.dbClient
        .insertInto('notification_type')
        .values(createNotificationType)
        .execute();
    } catch (error) {
      this.logger.error(
        'Error while seeding notification type ' + error.message,
      );
    }
  }

  async playground() {
    const pathToFile =
      process.env.NODE_ENV === 'production'
        ? '../../../src/infrastructure/prisma/data.csv'
        : 'data.csv';
    const filePath = path.join(__dirname, pathToFile);
    try {
      const stringify = await convertCsvToJson(filePath);
      const json = JSON.parse(stringify);
      /*eslint-disable-next-line */
      const playgrounds = json as Array<Record<string, any>>;
      this.nbPlaygroundAvaiaible = playgrounds.length;

      const queriesPlayground = playgrounds.map((playground) => {
        return {
          name: playground.name,
          address: playground.address,
          city: playground.city,
          region: playground.region,
          country: playground.country,
          longitude: playground.longitude,
          latitude: playground.latitude,
          post_code: playground.post_code,
          created_at: this.today,
          updated_at: this.today,
        };
      });

      await this.dbClient
        .insertInto('playground')
        .values(queriesPlayground)
        .execute();
    } catch (error) {
      this.logger.error('Error while converting csv to json ' + error);
    }
  }

  async user() {
    try {
      const users = await Promise.all(
        this.userToCreate.map(async (user) => {
          const hashedPassword = await this.passwordService.hash(user.password);
          return {
            id: user.id,
            email: user.email,
            password: hashedPassword,
            verified: 1,
            created_at: this.today,
          };
        }),
      );

      const userId = await this.dbClient
        .insertInto('user')
        .values(users)
        .returning('id')
        .execute();

      const ids = userId.map((id) => id.id);
      this.usersCreated = ids;

      const images = this.userToCreate
        .map((user) => {
          if (user.avatar_url) {
            return {
              url: user.avatar_url,
              created_at: this.today,
            };
          }
        })
        .filter((image) => image !== undefined);

      await this.dbClient.insertInto('image').values(images).execute();

      const profiles = this.userToCreate.map((profile, index) => {
        return {
          profile_id: this.usersCreated[index],
          username: profile.username,
          first_name: profile.first_name,
          last_name: profile.last_name,
          avatar_url: profile.avatar_url,
          created_at: this.today,
        };
      });

      await this.dbClient.insertInto('profile').values(profiles).execute();

      const synchUsers = this.userToCreate.map((user, index) => {
        return this.producerUserMessageService.pushToUserQueue({
          profile_id: this.usersCreated[index],
          username: user.username,
          avatar: user.avatar_url,
          action: 'update',
        });
      });

      await Promise.all(synchUsers);

      const skillUsers = this.userToCreate.map((user, index) => {
        return {
          pace: faker.number.int({ min: 20, max: 95 }),
          shooting: faker.number.int({ min: 50, max: 95 }),
          passing: faker.number.int({ min: 50, max: 95 }),
          dribbling: faker.number.int({ min: 50, max: 95 }),
          defending: faker.number.int({ min: 50, max: 95 }),
          rater_id: this.usersCreated[index],
          reviewee_id: this.usersCreated[index],
          created_at: this.today,
        };
      });

      await this.dbClient.insertInto('skill_foot').values(skillUsers).execute();
    } catch (error) {
      this.logger.error('Error while seeding user ' + error.message);
    }
  }

  async profileOnProfile() {
    if (!this.usersCreated || this.usersCreated.length < 2) {
      return this.logger.error('No user available');
    }
    const userInvitedByJoe = [0, 2, 3, 4, 5];
    const joeFriends = [6, 7, 8];
    const receivedRequestByJoe = [9, 10];
    const nbUserFriendsWithAdmin = 6;
    const adminFriends = new Array(nbUserFriendsWithAdmin).fill(1);

    const invitationSentByJoe = userInvitedByJoe.map((id) => {
      return {
        adder_id: this.usersCreated[1],
        friend_id: this.usersCreated[id],
        status_name: 'pending',
        created_at: this.today,
      };
    });
    const confirmedJoeFriends = joeFriends.map((id) => {
      return {
        adder_id: this.usersCreated[1],
        friend_id: this.usersCreated[id],
        status_name: 'confirmed',
        created_at: this.today,
      };
    });
    const joeFriendsConfirmed = joeFriends.map((id) => {
      return {
        adder_id: this.usersCreated[id],
        friend_id: this.usersCreated[1],
        status_name: 'confirmed',
        created_at: this.today,
      };
    });
    const pendingRequests = receivedRequestByJoe.map((id) => {
      return {
        adder_id: this.usersCreated[id],
        friend_id: this.usersCreated[1],
        status_name: 'pending',
        created_at: this.today,
      };
    });
    const confirmedAdminFriends = adminFriends
      .map((_, index) => {
        if (index !== 0) {
          return {
            adder_id: this.usersCreated[0],
            friend_id: this.usersCreated[index + 2],
            status_name: 'confirmed',
            created_at: this.today,
          };
        }
      })
      .filter((item) => item !== undefined);
    const confirmedAdminFriendsAdded = adminFriends
      .map((_, index) => {
        if (index !== 0) {
          return {
            adder_id: this.usersCreated[index + 2],
            friend_id: this.usersCreated[0],
            status_name: 'confirmed',
            created_at: this.today,
          };
        }
      })
      .filter((item) => item !== undefined);

    try {
      await this.dbClient
        .insertInto('profile_on_profile')
        .values([
          ...invitationSentByJoe,
          ...confirmedJoeFriends,
          ...joeFriendsConfirmed,
          ...pendingRequests,
          ...confirmedAdminFriends,
          ...confirmedAdminFriendsAdded,
        ])
        .execute();
    } catch (error) {
      this.logger.error(
        'Error while creating relation between user ' + error.message,
      );
    }
  }

  async pastEventOrganizedByAdmin() {
    if (!this.nbPlaygroundAvaiaible) {
      return this.logger.error('No playground available');
    }
    if (!this.usersCreated || this.usersCreated.length < 10) {
      return this.logger.error('No  enough user available');
    }
    const NB_EVENTS_TO_CREATE = 5;
    const events = new Array(NB_EVENTS_TO_CREATE).fill(1);

    const pastEvents = events.map(() => ({
      date: getUTCString(faker.date.past()),
      duration: 90,
      location_id: getRandomIntInclusive(this.nbPlaygroundAvaiaible),
      required_participants: 10,
      organizer_id: this.usersCreated[0],
      status_name: 'completed',
      created_at: this.today,
      visibility: 'private',
    }));
    try {
      const eventIds = await this.dbClient
        .transaction()
        .execute(async (trx) => {
          const eventIds = await trx
            .insertInto('event')
            .values(pastEvents)
            .returning('id')
            .execute();

          const scores = eventIds.map((event) => {
            return {
              score_team_1: faker.number.int({ min: 0, max: 20 }),
              score_team_2: faker.number.int({ min: 0, max: 20 }),
              event_id: event.id,
              created_at: this.today,
            };
          });
          await trx.insertInto('score').values(scores).execute();

          const participants = eventIds.map((event) => {
            return this.tenParticipants.map((_, index) => {
              return {
                profile_id: this.usersCreated[index],
                event_id: event.id,
                team: index < 5 ? 1 : 2,
                status_name: 'confirmed',
                created_at: this.today,
              };
            });
          });
          const flattenParticipants = participants.flat(1);
          await trx
            .insertInto('profile_on_event')
            .values(flattenParticipants)
            .execute();

          return eventIds;
        });
      const syncEvents = eventIds.map((event) => {
        return this.producerEventMessageService.pushToEventQueue({
          event_id: event.id,
          organizer_id: this.usersCreated[0],
          action: 'create_event',
          participants_id: this.usersCreated.slice(0, 9),
        });
      });
      await Promise.all(syncEvents);
    } catch (error) {
      this.logger.error('Error while creating past event' + error.message);
    }
  }

  async pastEventOrganizedByjoe() {
    if (!this.nbPlaygroundAvaiaible) {
      return this.logger.error('No playground available');
    }
    if (!this.usersCreated || this.usersCreated.length < 10) {
      return this.logger.error('No  enough user available');
    }
    const NB_EVENTS_TO_CREATE = 5;
    const events = new Array(NB_EVENTS_TO_CREATE).fill(1);

    const pastEvents = events.map(() => ({
      date: getUTCString(faker.date.past()),
      duration: 90,
      location_id: getRandomIntInclusive(this.nbPlaygroundAvaiaible),
      required_participants: 10,
      organizer_id: this.usersCreated[1],
      status_name: 'completed',
      created_at: this.today,
      visibility: 'private',
    }));
    try {
      const eventIds = await this.dbClient
        .transaction()
        .execute(async (trx) => {
          const eventIds = await trx
            .insertInto('event')
            .values(pastEvents)
            .returning('id')
            .execute();

          const scores = eventIds.map((event) => {
            return {
              score_team_1: faker.number.int({ min: 0, max: 20 }),
              score_team_2: faker.number.int({ min: 0, max: 20 }),
              event_id: event.id,
              created_at: this.today,
            };
          });
          await trx.insertInto('score').values(scores).execute();

          const participants = eventIds.map((event) => {
            return this.tenParticipants.map((_, index) => {
              return {
                profile_id: this.usersCreated[index],
                event_id: event.id,
                team: index < 5 ? 2 : 1,
                status_name: 'confirmed',
                created_at: this.today,
              };
            });
          });
          const flattenParticipants = participants.flat(1);
          await trx
            .insertInto('profile_on_event')
            .values(flattenParticipants)
            .execute();

          return eventIds;
        });
      const syncEvents = eventIds.map((event) => {
        return this.producerEventMessageService.pushToEventQueue({
          event_id: event.id,
          organizer_id: this.usersCreated[1],
          action: 'create_event',
          participants_id: this.usersCreated.slice(0, 9),
        });
      });
      await Promise.all(syncEvents);
    } catch (error) {
      this.logger.error('Error while creating past event' + error.message);
    }
  }

  async futureEventsOrganizedByAdmin() {
    if (!this.nbPlaygroundAvaiaible) {
      return this.logger.error('No playground available');
    }
    if (!this.usersCreated || this.usersCreated.length < 10) {
      return this.logger.error('No  enough user available');
    }
    const NB_EVENTS_TO_CREATE = 5;
    const events = new Array(NB_EVENTS_TO_CREATE).fill(1);

    const futureEvents = events.map(() => ({
      date: getUTCString(faker.date.future()),
      duration: 90,
      location_id: getRandomIntInclusive(this.nbPlaygroundAvaiaible),
      required_participants: 10,
      organizer_id: this.usersCreated[0],
      status_name: 'full',
      created_at: this.today,
      visibility: 'private',
      price: 115,
    }));
    try {
      const eventIds = await this.dbClient
        .transaction()
        .execute(async (trx) => {
          const eventIds = await trx
            .insertInto('event')
            .values(futureEvents)
            .returning('id')
            .execute();

          const scores = eventIds.map((event) => {
            return {
              score_team_1: faker.number.int({ min: 0, max: 20 }),
              score_team_2: faker.number.int({ min: 0, max: 20 }),
              event_id: event.id,
              created_at: this.today,
            };
          });
          await trx.insertInto('score').values(scores).execute();

          const participants = eventIds.map((event) => {
            return this.tenParticipants.map((_, index) => {
              return {
                profile_id: this.usersCreated[index],
                event_id: event.id,
                team: index < 5 ? 1 : 2,
                status_name: 'confirmed',
                created_at: this.today,
              };
            });
          });
          const flattenParticipants = participants.flat(1);
          await trx
            .insertInto('profile_on_event')
            .values(flattenParticipants)
            .execute();

          return eventIds;
        });
      const syncEvents = eventIds.map((event) => {
        return this.producerEventMessageService.pushToEventQueue({
          event_id: event.id,
          organizer_id: this.usersCreated[0],
          action: 'create_event',
          participants_id: this.usersCreated.slice(0, 9),
        });
      });
      await Promise.all(syncEvents);
    } catch (error) {
      this.logger.error(
        'Error while creating future event organize bv admin' + error.message,
      );
    }
  }

  async futureEventsOrganizedByJoe() {
    if (!this.nbPlaygroundAvaiaible) {
      return this.logger.error('No playground available');
    }
    if (!this.usersCreated || this.usersCreated.length < 10) {
      return this.logger.error('No  enough user available');
    }
    const NB_EVENTS_TO_CREATE = 5;
    const events = new Array(NB_EVENTS_TO_CREATE).fill(1);

    const futureEvents = events.map(() => ({
      date: getUTCString(faker.date.future()),
      duration: 90,
      location_id: getRandomIntInclusive(this.nbPlaygroundAvaiaible),
      required_participants: 10,
      organizer_id: this.usersCreated[1],
      status_name: 'full',
      created_at: this.today,
      visibility: 'private',
      price: 130,
    }));
    try {
      const eventIds = await this.dbClient
        .transaction()
        .execute(async (trx) => {
          const eventIds = await trx
            .insertInto('event')
            .values(futureEvents)
            .returning('id')
            .execute();

          const scores = eventIds.map((event) => {
            return {
              score_team_1: faker.number.int({ min: 0, max: 20 }),
              score_team_2: faker.number.int({ min: 0, max: 20 }),
              event_id: event.id,
              created_at: this.today,
            };
          });
          await trx.insertInto('score').values(scores).execute();

          const participants = eventIds.map((event) => {
            return this.tenParticipants.map((_, index) => {
              return {
                profile_id: this.usersCreated[index],
                event_id: event.id,
                team: index < 5 ? 1 : 2,
                status_name: 'confirmed',
                created_at: this.today,
              };
            });
          });
          const flattenParticipants = participants.flat(1);
          await trx
            .insertInto('profile_on_event')
            .values(flattenParticipants)
            .execute();

          return eventIds;
        });
      const syncEvents = eventIds.map((event) => {
        return this.producerEventMessageService.pushToEventQueue({
          event_id: event.id,
          organizer_id: this.usersCreated[1],
          action: 'create_event',
          participants_id: this.usersCreated.slice(0, 9),
        });
      });
      await Promise.all(syncEvents);
    } catch (error) {
      this.logger.error(
        'Error while creating future event organize bv joe' + error.message,
      );
    }
  }

  async futureEventsOrganizedByAdminAndOpen() {
    if (!this.nbPlaygroundAvaiaible) {
      return this.logger.error('No playground available');
    }
    if (!this.usersCreated || this.usersCreated.length < 10) {
      return this.logger.error('No  enough user available');
    }
    const NB_EVENTS_OPEN_TO_CREATE = 6;
    const events = new Array(NB_EVENTS_OPEN_TO_CREATE).fill(1);
    const openParticipants = [1, 1, 1, 1, 1, 1];

    const futureOpenEvents = events.map(() => ({
      date: getUTCString(faker.date.future()),
      duration: 60,
      location_id: getRandomIntInclusive(this.nbPlaygroundAvaiaible),
      required_participants: 6,
      organizer_id: this.usersCreated[0],
      status_name: 'open',
      created_at: this.today,
      visibility: 'public',
      price: 120,
    }));

    try {
      const eventIds = await this.dbClient
        .transaction()
        .execute(async (trx) => {
          const eventIds = await trx
            .insertInto('event')
            .values(futureOpenEvents)
            .returning('id')
            .execute();

          const participants = eventIds.map((event) => {
            return openParticipants.map((_, index) => {
              return {
                profile_id: this.usersCreated[index],
                event_id: event.id,
                status_name: index < 3 ? 'confirmed' : 'pending',
                created_at: this.today,
              };
            });
          });
          const flattenParticipants = participants.flat(1);
          await trx
            .insertInto('profile_on_event')
            .values(flattenParticipants)
            .execute();

          return eventIds;
        });
      const syncEvents = eventIds.map((event) => {
        return this.producerEventMessageService.pushToEventQueue({
          event_id: event.id,
          organizer_id: this.usersCreated[0],
          action: 'create_event',
          participants_id: this.usersCreated.slice(0, 5),
        });
      });
      await Promise.all(syncEvents);
    } catch (error) {
      this.logger.error(
        'Error while creating future event organize bv admin' + error.message,
      );
    }
  }

  async futureEventsOrganizedByJoeAndOpen() {
    if (!this.nbPlaygroundAvaiaible) {
      return this.logger.error('No playground available');
    }
    if (!this.usersCreated || this.usersCreated.length < 10) {
      return this.logger.error('No  enough user available');
    }
    const NB_EVENTS_OPEN_TO_CREATE = 6;
    const events = new Array(NB_EVENTS_OPEN_TO_CREATE).fill(1);

    const futureOpenEvents = events.map(() => ({
      date: getUTCString(faker.date.future()),
      duration: 60,
      location_id: getRandomIntInclusive(this.nbPlaygroundAvaiaible),
      required_participants: 10,
      organizer_id: this.usersCreated[1],
      status_name: 'open',
      created_at: this.today,
      visibility: 'public',
      price: 90,
    }));

    try {
      const eventIds = await this.dbClient
        .transaction()
        .execute(async (trx) => {
          const eventIds = await trx
            .insertInto('event')
            .values(futureOpenEvents)
            .returning('id')
            .execute();

          const participants = eventIds.map((event) => {
            return this.tenParticipants.map((_, index) => {
              return {
                profile_id: this.usersCreated[index],
                event_id: event.id,
                status_name: index < 5 ? 'confirmed' : 'pending',
                created_at: this.today,
              };
            });
          });
          const flattenParticipants = participants.flat(1);
          await trx
            .insertInto('profile_on_event')
            .values(flattenParticipants)
            .execute();

          return eventIds;
        });
      const syncEvents = eventIds.map((event) => {
        return this.producerEventMessageService.pushToEventQueue({
          event_id: event.id,
          organizer_id: this.usersCreated[1],
          action: 'create_event',
          participants_id: this.usersCreated.slice(0, 9),
        });
      });
      await Promise.all(syncEvents);
    } catch (error) {
      this.logger.error(
        'Error while creating future event organize bv admin' + error.message,
      );
    }
  }

  async run() {
    await this.status();
    await this.notificationType();
    await this.playground();
    await this.user();
    await this.profileOnProfile();
    await this.pastEventOrganizedByAdmin();
    await this.pastEventOrganizedByjoe();
    await this.futureEventsOrganizedByAdmin();
    await this.futureEventsOrganizedByJoe();
    await this.futureEventsOrganizedByAdminAndOpen();
    await this.futureEventsOrganizedByJoeAndOpen();
    this.logger.log('Database has been seed');
  }
}

const dialect = new SqliteDialect({
  database: new SQLite('./src/infrastructure/prisma/sqlite.db'),
});

const seed = new Seed(
  new Kysely<DB>({
    dialect,
    plugins: [new ParseJSONResultsPlugin()],
  }),
  new Logger('Seed'),
  new BcryptAdapterService(),
);
seed.run();
