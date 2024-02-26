import { Inject, Injectable } from '@nestjs/common';
import { Kysely, sql } from 'kysely';
import { CoreAdapter } from 'src/infrastructure/kysely/adapters/core.adapter';
import { DB } from 'src/infrastructure/kysely/database.type';
import { EventQueriesRepository } from 'src/domain/repositories/event.queries.repository';
import { DatabaseException } from '../database.exception';
import { EventAggr } from 'src/domain/entities/event.entity';
import { jsonArrayFrom } from 'kysely/helpers/sqlite';

@Injectable()
export class EventQueriesAdapter
  extends CoreAdapter<'event'>
  implements EventQueriesRepository {
  constructor(@Inject('dbClient') protected dbClient: Kysely<DB>) {
    super(dbClient);
    this.tableName = 'event';
  }
  async getNbBonusPerProfile(profileId: string) {
    try {
      const nbBonus = await this.client
        .selectFrom('event')
        .select(({ fn }) => [
          fn.count<number>('event.mvp_id').as('nb_mvp_bonus'),
        ])
        .select(({ fn }) => [
          fn.count<number>('event.best_striker_id').as('nb_best_striker_bonus'),
        ])
        .where((eb) =>
          eb('event.mvp_id', '=', profileId).or(
            'event.best_striker_id',
            '=',
            profileId,
          ),
        )
        .executeTakeFirst();
      return nbBonus;
    } catch (error) {
      if (error instanceof Error) {
        throw new DatabaseException(error);
      }
    }
  }
  async getOneEvent(eventId: number, profileId: string) {
    try {
      const res = await this.dbClient
        .selectFrom('event')
        .select([
          'event.id as event_id',
          'event.domain_id',
          'event.date',
          'event.duration',
          'event.location_id',
          'event.required_participants',
          'event.nb_teams',
          'event.organizer_id',
          'event.status_name',
          'event.price',
          'event.visibility',
          'event.mvp_id',
          'event.best_striker_id',
        ])
        .innerJoin('playground', 'event.location_id', 'playground.id')
        .innerJoin('profile_on_event', 'event.id', 'profile_on_event.event_id')
        .innerJoin(
          'profile',
          'profile_on_event.profile_id',
          'profile.profile_id',
        )
        .leftJoin('score', 'event.id', 'score.event_id')
        .select(({ selectFrom, eb }) => [
          selectFrom('profile_on_event')
            .select(({ fn }) => fn.count<number>('event_id').as('confirmed'))
            .whereRef('event_id', '=', 'event.id')
            .where('status_name', '=', 'confirmed')
            .as('confirmed_participants'),
          selectFrom('profile_on_event')
            .select('profile_on_event.status_name')
            .whereRef('event_id', '=', 'event.id')
            .where('profile_id', '=', profileId)
            .as('user_status'),
          jsonArrayFrom(
            eb
              .selectFrom('profile_on_event')
              .select([
                'profile_on_event.profile_id',
                'profile.username',
                'profile.avatar_url as avatar',
                'profile_on_event.status_name as status',
                'profile.last_evaluation',
                'profile_on_event.team',
              ])
              .innerJoin(
                'profile',
                'profile_on_event.profile_id',
                'profile.profile_id',
              )
              .whereRef('event_id', '=', 'event.id'),
          ).as('participants'),
        ])
        .select([
          'score.score_team_1',
          'score.score_team_2',
          'playground.name as location',
          'playground.city as playground_city',
          'playground.address as playground_address',
        ])
        .where('event.id', '=', eventId)
        .executeTakeFirst();

      return res;
    } catch (error) {
      if (error instanceof Error) {
        throw new DatabaseException(error);
      }
    }
  }
  async getEvents(profileId: string) {
    try {
      const result = await sql`
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
AND user_status <> 'requested'
AND user_status <> 'refused'
AND EXISTS(
  SELECT 1
  FROM profile_on_event 
  WHERE event_id = event.id
  AND profile_id = ${profileId}
)
GROUP BY event.id
ORDER BY date DESC
      `.execute(this.client);

      const parsedResult = result.rows.map((event: EventAggr) => {
        return {
          ...event,
          participants:
            typeof event.participants === 'string' &&
            JSON.parse(event.participants),
        };
      });

      return parsedResult as EventAggr[];
    } catch (error) {
      if (error instanceof Error) {
        throw new DatabaseException(error);
      }
    }
  }
  async getOrganizerEventsPaginated(profileId: string, page: number) {
    try {
      const result = await sql`
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

      const parsedResult: EventAggr[] = result.rows.map((event: EventAggr) => {
        return {
          ...event,
          participants:
            typeof event.participants === 'string' &&
            JSON.parse(event.participants),
        };
      });

      return { events: parsedResult, count: count.rows[0].total_event };
    } catch (error) {
      if (error instanceof Error) {
        throw new DatabaseException(error);
      }
    }
  }
  async getPastEventsPaginated(profileId: string, page: number) {
    try {
      const result = await sql`
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
AND user_status <> 'requested'
AND user_status <> 'refused'
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

      const parsedResult = result.rows.map((event: EventAggr) => {
        return {
          ...event,
          participants:
            typeof event.participants === 'string' &&
            JSON.parse(event.participants),
        };
      });
      return { events: parsedResult, count: count.rows[0].total_event };
    } catch (error) {
      if (error instanceof Error) {
        throw new DatabaseException(error);
      }
    }
  }
  async getUpcomingEventsPaginated(profileId: string, page: number) {
    try {
      const result = await sql`
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
AND user_status <> 'requested'
AND user_status <> 'refused'
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

      const parsedResult = result.rows.map((event: EventAggr) => {
        return {
          ...event,
          participants:
            typeof event.participants === 'string' &&
            JSON.parse(event.participants),
        };
      });
      return { events: parsedResult, count: count.rows[0].total_event };
    } catch (error) {
      if (error instanceof Error) {
        throw new DatabaseException(error);
      }
    }
  }
  async getEventNotificationSubscribers(eventId: number) {
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
        throw new DatabaseException(error);
      }
    }
  }
  async getLastSharedEvent(profileId: string, friendId: string) {
    try {
      const result = await this.dbClient
        .selectFrom('profile_on_event as user')
        .innerJoin(
          'profile_on_event as friend',
          'user.event_id',
          'friend.event_id',
        )
        .innerJoin('event', 'user.event_id', 'event.id')
        .leftJoin('score', 'event.id', 'score.event_id')
        .innerJoin('playground', 'event.location_id', 'playground.id')
        .select([
          'event.id as event_id',
          'event.date',
          'event.location_id',
          'event.duration',
          'score.score_team_1',
          'score.score_team_2',
          'playground.city as playground_city',
          'playground.name as location',
          'playground.address as playground_address',
        ])
        .select(({ eb }) => [
          jsonArrayFrom(
            eb
              .selectFrom('profile_on_event')
              .innerJoin(
                'profile',
                'profile_on_event.profile_id',
                'profile.profile_id',
              )
              .select([
                'profile_on_event.profile_id',
                'profile.username',
                'profile.avatar_url as avatar',
                'profile_on_event.status_name as status',
                'profile.last_evaluation',
                'profile_on_event.team',
              ])
              .whereRef('event_id', '=', 'event.id'),
          ).as('participants'),
        ])
        .where('user.profile_id', '=', profileId)
        .where('friend.profile_id', '=', friendId)
        .where('user.status_name', '=', 'confirmed')
        .where('friend.status_name', '=', 'confirmed')
        .where('event.status_name', '=', 'completed')
        .groupBy('event.id')
        .orderBy('event.date', 'desc')
        .limit(5)
        .execute();

      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new DatabaseException(error);
      }
    }
  }
  async getEventLocationByCountry(country: string) {
    try {
      const result = await this.dbClient
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
        .where('event.visibility', '=', 'public')
        .execute();

      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new DatabaseException(error);
      }
    }
  }
  async getNearestEventsInfos(eventIds: number[], profileId: string) {
    try {
      const result = await this.dbClient
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
          'playground.name as playground_name',
          'playground.city as playground_city',
          'profile.username as organizer_username',
          'profile.avatar_url as organizer_avatar',
        ])
        .select(({ selectFrom }) => [
          selectFrom('profile_on_event')
            .select(({ fn }) => fn.count<number>('event_id').as('confirmed'))
            .whereRef('event_id', '=', 'event.id')
            .where('status_name', '=', 'confirmed')
            .as('confirmed_participants'),
          selectFrom('profile_on_event')
            .select(({ fn }) =>
              fn.avg<number>('profile.last_evaluation').as('average'),
            )
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
        .where((qb) =>
          qb.not(
            qb.exists(
              qb
                .selectFrom('profile_on_event')
                .select(['event_id', 'profile_id'])
                .whereRef('event_id', '=', 'event.id')
                .where((eb) =>
                  eb.or([
                    eb('status_name', '=', 'confirmed'),
                    eb('status_name', '=', 'pending'),
                    eb('status_name', '=', 'requested'),
                  ]),
                )
                .where('profile_id', '=', profileId),
            ),
          ),
        )
        .groupBy('event.id')
        .execute();
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new DatabaseException(error);
      }
    }
  }
  async getMvpCount(profileId: string): Promise<{ nb_mvp: number }> {
    try {
      const nbMvpResult = await sql<{ nb_mvp: number }>`
      SELECT 
        COUNT (*) AS nb_mvp
      FROM event  
      WHERE mvp_id = ${profileId}
      `.execute(this.dbClient);
      return nbMvpResult.rows[0];
    } catch (error) {
      if (error instanceof Error) {
        throw new DatabaseException(error);
      }
    }
  }
  async getBestStrikerCount(
    profileId: string,
  ): Promise<{ nb_best_striker: number }> {
    try {
      const nbBestStrikerResult = await sql<{ nb_best_striker: number }>`
        SELECT 
          COUNT (*) AS nb_best_striker
        FROM event  
        WHERE best_striker_id = ${profileId}   
        `.execute(this.dbClient);
      return nbBestStrikerResult.rows[0];
    } catch (error) {
      if (error instanceof Error) {
        throw new DatabaseException(error);
      }
    }
  }
}
