import { Core } from './core.js';
import { InsertObject, sql } from 'kysely';
import type { EventType } from '@skillcoop/types';
import { getFormattedUTCTimestamp } from '@skillcoop/date-handler';
import { DB } from '../@types/database.js';
import { InsertObjectDB, tableNames } from '../@types/types.js';
import { db } from '../helpers/client.db.js';
import DatabaseError from '../helpers/errors/database.error.js';
import { eventQueuePublisher } from '../publishers/event.publisher.js';
//TODO : refactor the class into smaller class
export class EventModel extends Core<typeof tableNames.event> {
  declare tableName: typeof tableNames.event;

  constructor(client: typeof db) {
    super(client);
    this.tableName = tableNames.event;
  }
  /**
   *
   * @param data
   * @returns returns the id of the created event
     @description Same methods as createOne but returns 
                  the id of the created event
   */
  async create(data: InsertObjectDB<typeof tableNames.event>) {
    const todayUTCString = getFormattedUTCTimestamp();
    data.created_at = todayUTCString;

    try {
      const [result] = await this.client
        .insertInto(this.tableName)
        .values(data as unknown as InsertObject<DB, 'event'>)
        .returning('id')
        .execute();

      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new DatabaseError(error);
      }
    }
  }
  async getEventById(eventId: number, profileId: number) {
    try {
      const result = await sql<EventType>`
SELECT 
  event.id AS event_id,
  event.date,
  event.duration,
  playground.name AS location,
  playground.city AS playground_city,
  playground.address AS playground_address,
  event.location_id,
  event.required_participants,
  event.nb_teams,
  event.organizer_id,
  event.status_name,
  event.mvp_id,
  event.best_striker_id,
  score.score_team_1,
  score.score_team_2, 
  (json_group_array(
      json_object(
          'profile_id' , participant.profile_id, 
          'username' , profile.username	,
          'avatar', profile.avatar_url,
          'status', participant.status_name,
          'last_evaluation', profile.last_evaluation,
          'team', participant.team
        )
      ) 
  ) AS participants,
  (SELECT COUNT (*) 
  FROM profile_on_event 
  WHERE event_id = event.id 
  AND status_name = 'confirmed') AS confirmed_participants,
 (SELECT participant.status_name
  FROM profile_on_event AS participant
  WHERE participant.profile_id = ${profileId} 
  AND participant.event_id = ${eventId} ) AS user_status
FROM event
LEFT JOIN score ON event.id = score.event_id
JOIN playground ON event.location_id = playground.id
JOIN profile_on_event AS participant ON event.id = participant.event_id
JOIN profile ON participant.profile_id = profile.profile_id
WHERE event.id = ${eventId}
      `.execute(this.client);

      const parsedResult = result.rows.map((event: EventType) => {
        return {
          ...event,
          participants:
            typeof event.participants === 'string' &&
            JSON.parse(event.participants),
        };
      });
      return parsedResult[0];
    } catch (error) {
      if (error instanceof Error) {
        throw new DatabaseError(error);
      }
    }
  }
  async getEventByUserId(profileId: number) {
    try {
      const result = await sql<EventType>`
SELECT 
  event.id AS event_id,
  event.date,
  event.duration,
  playground.name AS location,
  playground.city AS playground_city,
  playground.address AS playground_address,
  event.location_id,
  event.required_participants,
  event.nb_teams,
  event.organizer_id,
  event.status_name,
  score.score_team_1,
  score.score_team_2, 
  (json_group_array(
      json_object(
          'profile_id' , participant.profile_id, 
          'username' , profile.username	,
          'avatar', profile.avatar_url,
          'status', participant.status_name,
          'last_evaluation', profile.last_evaluation,
          'team', participant.team
        )
      ) 
  ) AS participants,
  (SELECT participant.status_name
  FROM profile_on_event AS participant
  WHERE participant.profile_id = ${profileId} 
  AND participant.event_id = event.id) AS user_status,
  (SELECT COUNT (*) 
  FROM profile_on_event 
  WHERE event_id = event.id 
  AND status_name = 'confirmed') AS confirmed_participants
FROM event
LEFT JOIN score ON event.id = score.event_id
JOIN playground ON event.location_id = playground.id
JOIN profile_on_event AS participant ON event.id = participant.event_id
JOIN profile ON participant.profile_id = profile.profile_id
WHERE user_status <> 'declined'
AND EXISTS(
  SELECT 1
  FROM profile_on_event 
  WHERE event_id = event.id
  AND profile_id = ${profileId}
)
GROUP BY event.id
ORDER BY date DESC
      `.execute(this.client);

      const parsedResult = result.rows.map((event: EventType) => {
        return {
          ...event,
          participants:
            typeof event.participants === 'string' &&
            JSON.parse(event.participants),
        };
      });

      return parsedResult;
    } catch (error) {
      if (error instanceof Error) {
        throw new DatabaseError(error);
      }
    }
  }
  async getOrganizerEvents(profileId: number, page: number = 1) {
    try {
      const result = await sql<EventType>`
SELECT 
  event.id AS event_id,
  event.date,
  event.duration,
  playground.name AS location,
  playground.city AS playground_city,
  playground.address AS playground_address,
  event.location_id,
  event.required_participants,
  event.nb_teams,
  event.organizer_id,
  event.status_name,
  score.score_team_1,
  score.score_team_2, 
  (json_group_array(
    json_object(
        'profile_id' , participant.profile_id, 
        'username' , profile.username	,
        'avatar', profile.avatar_url,
        'status', participant.status_name,
        'team', participant.team
         )
      ) 
   ) AS participants,
  (SELECT COUNT (*) 
   FROM profile_on_event 
   WHERE event_id = event.id 
   AND status_name = 'confirmed'
   ) AS confirmed_participants
FROM event
LEFT JOIN score ON event.id = score.event_id
JOIN playground ON event.location_id = playground.id
JOIN profile_on_event AS participant ON event.id = participant.event_id
JOIN profile ON participant.profile_id = profile.profile_id
WHERE event.organizer_id = ${profileId}
GROUP BY event.id
ORDER BY date DESC
LIMIT 10 OFFSET ${(page - 1) * 10}
      `.execute(this.client);

      const count = await sql<{ total_event: number }>`
SELECT 
  COUNT (event.id) AS total_event 
FROM event
WHERE event.organizer_id = ${profileId}
      `.execute(this.client);

      const parsedResult = result.rows.map((event) => {
        return {
          ...event,
          participants:
            typeof event.participants === 'string' &&
            JSON.parse(event.participants),
        };
      });

      return { events: parsedResult, eventCount: count.rows[0].total_event };
    } catch (error) {
      if (error instanceof Error) {
        throw new DatabaseError(error);
      }
    }
  }
  async getPastEvents(profileId: number, page: number) {
    const result = await sql<EventType>`
SELECT 
  event.id AS event_id,
  event.date,
  event.duration,
  playground.name AS location,
  playground.city AS playground_city,
  playground.address AS playground_address,
  event.location_id,
  event.required_participants,
  event.nb_teams,
  event.organizer_id,
  event.status_name,
  score.score_team_1,
  score.score_team_2, 
  (json_group_array(
      json_object(
          'profile_id' , participant.profile_id, 
          'username' , profile.username	,
          'avatar', profile.avatar_url,
          'status', participant.status_name,
          'team', participant.team
        )
      ) 
  ) AS participants,
  (SELECT participant.status_name
  FROM profile_on_event AS participant
  WHERE participant.profile_id = ${profileId} 
  AND participant.event_id = event.id ) AS user_status,
  (SELECT COUNT (*) 
  FROM profile_on_event 
  WHERE event_id = event.id 
  AND status_name = 'confirmed') AS confirmed_participants
FROM event
LEFT JOIN score ON event.id = score.event_id
JOIN playground ON event.location_id = playground.id
JOIN profile_on_event AS participant ON event.id = participant.event_id
JOIN profile ON participant.profile_id = profile.profile_id
WHERE user_status <> 'declined'
AND EXISTS(
  SELECT 1
  FROM profile_on_event 
  WHERE event_id = event.id
  AND profile_id = ${profileId}
)
AND event.date < date('now')
GROUP BY event.id
ORDER BY date DESC
LIMIT 10 OFFSET ${(page - 1) * 10}
      `.execute(this.client);

    const count = await sql<{ total_event: number }>`
SELECT 
  COUNT (event.id) AS total_event ,
 (SELECT participant.status_name
  FROM profile_on_event AS participant
  WHERE participant.profile_id = ${profileId} 
  AND participant.event_id = event.id) AS user_status
FROM event
WHERE user_status <> 'declined'
AND EXISTS(
  SELECT 1
  FROM profile_on_event 
  WHERE profile_on_event.event_id = event.id
  AND profile_id = ${profileId}
)
AND event.date < date('now')
      `.execute(this.client);

    const parsedResult = result.rows.map((event) => {
      return {
        ...event,
        participants:
          typeof event.participants === 'string' &&
          JSON.parse(event.participants),
      };
    });
    return { events: parsedResult, eventCount: count.rows[0].total_event };
  }
  async getUpcomingEvents(profileId: number, page: number) {
    const result = await sql<EventType>`
SELECT 
  event.id AS event_id,
  event.date,
  event.duration,
  playground.name AS location,
  playground.city AS playground_city,
  playground.address AS playground_address,
  event.location_id,
  event.required_participants,
  event.nb_teams,
  event.organizer_id,
  event.status_name,
  score.score_team_1,
  score.score_team_2, 
  (json_group_array(
      json_object(
          'profile_id' , participant.profile_id, 
          'username' , profile.username	,
          'avatar', profile.avatar_url,
          'status', participant.status_name,
          'team', participant.team
        )
      ) 
  ) AS participants,
  (SELECT participant.status_name
  FROM profile_on_event AS participant
  WHERE participant.profile_id = ${profileId} 
  AND participant.event_id = event.id ) AS user_status,
  (SELECT COUNT (*) 
  FROM profile_on_event 
  WHERE event_id = event.id 
  AND status_name = 'confirmed') AS confirmed_participants
FROM event
LEFT JOIN score ON event.id = score.event_id
JOIN playground ON event.location_id = playground.id
JOIN profile_on_event AS participant ON event.id = participant.event_id
JOIN profile ON participant.profile_id = profile.profile_id
WHERE user_status <> 'declined'
AND EXISTS(
  SELECT 1
  FROM profile_on_event 
  WHERE event_id = event.id
  AND profile_id = ${profileId}
)
AND event.date > date('now')
GROUP BY event.id
ORDER BY date ASC
LIMIT 10 OFFSET ${(page - 1) * 10}
      `.execute(this.client);

    const count = await sql<{ total_event: number }>`
SELECT 
  COUNT (event.id) AS total_event ,
 (SELECT participant.status_name
  FROM profile_on_event AS participant
  WHERE participant.profile_id = ${profileId} 
  AND participant.event_id = event.id) AS user_status
FROM event
WHERE user_status <> 'declined'
AND EXISTS(
  SELECT 1
  FROM profile_on_event 
  WHERE profile_on_event.event_id = event.id
  AND profile_id = ${profileId}
)
AND event.date > datetime('now')
      `.execute(this.client);

    const parsedResult = result.rows.map((event) => {
      return {
        ...event,
        participants:
          typeof event.participants === 'string' &&
          JSON.parse(event.participants),
      };
    });
    return { events: parsedResult, eventCount: count.rows[0].total_event };
  }
  async updateMvp(eventId: number) {
    const todayUTCString = getFormattedUTCTimestamp();
    try {
      const result = await sql`
UPDATE event 
SET mvp_id = (
    SELECT 
      profile_id
    FROM(
        SELECT MAX(nb_votes) AS max_votes ,
            profile_id,
            event_id
        FROM (
            SELECT 
                profile_id,
                event_id,
                COUNT(mvp_poll.profile_id) AS nb_votes
            FROM mvp_poll
            WHERE mvp_poll.event_id = ${eventId}
            GROUP BY profile_id 
            ) 
        )
  ) ,
    updated_at = ${todayUTCString}
WHERE id = ${eventId}
`.execute(this.client);

      return !!result.numAffectedRows;
    } catch (error) {
      if (error instanceof Error) {
        throw new DatabaseError(error);
      }
    }
  }
  async updateBestStriker(eventId: number) {
    const todayUTCString = getFormattedUTCTimestamp();
    try {
      const result = await sql`
UPDATE event 
SET best_striker_id = (
    SELECT 
      profile_id
    FROM(
        SELECT MAX(nb_votes) AS max_votes ,
            profile_id,
            event_id
        FROM (
            SELECT 
                profile_id,
                event_id,
                COUNT(best_striker_poll.profile_id) AS nb_votes
            FROM best_striker_poll
            WHERE best_striker_poll.event_id = ${eventId}
            GROUP BY profile_id 
            ) 
        )
  ) ,
    updated_at = ${todayUTCString}
WHERE id = ${eventId}
`.execute(this.client);
      return !!result.numAffectedRows;
    } catch (error) {
      if (error instanceof Error) {
        throw new DatabaseError(error);
      }
    }
  }
  async getSubscribers(eventId: number): Promise<number[] | undefined> {
    try {
      const result = await sql<{ profile_ids: string }>`
SELECT
  (json_group_array(participant.profile_id)) AS profile_ids
FROM event
INNER JOIN profile_on_event AS participant ON event.id = participant.event_id
INNER JOIN profile ON participant.profile_id = profile.profile_id
WHERE participant.event_id = ${eventId}
AND profile.profile_id <> event.organizer_id
AND (participant.status_name = 'confirmed' 
OR (profile.active_notification = 1 AND participant.status_name = 'pending'))
GROUP BY participant.event_id`.execute(this.client);
      const parsedJson: number[] =
        result.rows.length > 0
          ? JSON.parse(result.rows[0].profile_ids)
          : undefined;
      return parsedJson;
    } catch (error) {
      if (error instanceof Error) {
        throw new DatabaseError(error);
      }
    }
  }
  async deleteSyncChat(eventId: number, organizerId?: number) {
    const result = await this.deleteOne({ id: eventId });
    if (result && organizerId) {
      await eventQueuePublisher({
        event_id: eventId,
        organizer_id: organizerId,
        action: 'delete_event',
      });
    }
  }
  async getLastSharedEvents(profileId: number, friendId: number) {
    try {
      const result = await sql<Record<string, string | number>>`
SELECT 
  a.event_id, 
  e.date,
  e.duration,
  playground.name AS location,
  playground.city AS playground_city,
  playground.address AS playground_address,
  e.location_id,
  score.score_team_1,
  score.score_team_2, 
  (json_group_array(
      json_object(
          'profile_id' , participant.profile_id, 
          'username' , profile.username	,
          'avatar', profile.avatar_url,
          'team', participant.team
        )
      ) 
  ) AS participants
FROM profile_on_event AS a
JOIN profile_on_event AS b ON a.event_id = b.event_id
INNER JOIN event AS e ON a.event_id = e.id
LEFT JOIN score ON e.id = score.event_id
JOIN playground ON event.location_id = playground.id
JOIN profile_on_event AS participant ON e.id = participant.event_id
JOIN profile ON participant.profile_id = profile.profile_id
WHERE a.profile_id = ${profileId} 
AND b.profile_id = ${friendId}
AND a.status_name = 'confirmed' 
AND b.status_name = 'confirmed'
AND e.status_name = 'completed'
GROUP BY a.event_id, b.event_id
ORDER BY e.date DESC
LIMIT 5
`.execute(this.client);

      const parsedResult = result.rows.map((event) => {
        return {
          ...event,
          participants:
            typeof event.participants === 'string' &&
            JSON.parse(event.participants),
        };
      });

      return parsedResult;
    } catch (error) {
      if (error instanceof Error) {
        throw new DatabaseError(error);
      }
    }
  }
  async getEventLocationByCountry(country: string) {
    try {
      const result = await db
        .selectFrom('event')
        .innerJoin('playground', 'event.location_id', 'playground.id')
        .select([
          'event.id',
          'playground.longitude as longitude',
          'playground.latitude as latitude',
          'playground.country as country',
        ])
        .where('playground.country', '=', country)
        .where('event.status_name', '=', 'open')
        .where('event.date', '>=', sql`CURRENT_DATE`)
        // .where('event.visibility', '=', 'public')
        .execute();

      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new DatabaseError(error);
      }
    }
  }
  async getNearestEventsInfos(eventIds: number[]) {
    try {
      const result = await db
        .selectFrom('event')
        .innerJoin('playground', 'event.location_id', 'playground.id')
        .innerJoin('profile', 'event.organizer_id', 'profile.profile_id')
        .innerJoin('profile_on_event', 'event.id', 'profile_on_event.event_id')
        .select([
          'event.id',
          'event.date',
          'event.duration',
          'event.required_participants',
          'event.price',
          'playground.name',
          'playground.city',
          'profile.username',
          'profile.avatar_url',
        ])
        .select(({ selectFrom }) => [
          selectFrom('profile_on_event')
            .select(({ fn }) => fn.count('event_id').as('confirmed'))
            .whereRef('event_id', '=', 'event.id')
            .where('status_name', '=', 'confirmed')
            .as('confirmed_participants'),
          selectFrom('profile_on_event')
            .select(({ fn }) => fn.avg('profile.last_evaluation').as('average'))
            .innerJoin(
              'profile',
              'profile_on_event.profile_id',
              'profile.profile_id',
            )
            .whereRef('event_id', '=', 'event.id')
            .where('status_name', '=', 'confirmed')
            .as('average_event_evaluation'),
        ])
        .where('event.id', 'in', eventIds)
        .groupBy('event.id')
        .execute();
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new DatabaseError(error);
      }
    }
  }
}
