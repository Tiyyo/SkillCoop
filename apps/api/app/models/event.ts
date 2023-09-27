import { Core } from "./core";
import { sql } from "kysely";
import type { EventType } from "../@types/types";
import DatabaseError from "../helpers/errors/database.error";


export class Event extends Core {
  tableName: string = "event";

  constructor(client: any) {
    super(client);
  }
  async getEventByUserId(profileId: number) {
    try {
      const result = await sql<any>`
SELECT 
  event.id AS event_id,
  event.date,
  event.duration,
  event.location,
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
  WHERE participant.profile_id = ${profileId} ) AS user_status,
  (SELECT COUNT (*) FROM profile_on_event WHERE event_id = event.id AND status_name = 'confirmed') AS confirmed_participants
FROM event
LEFT JOIN score ON event.id = score.event_id
JOIN profile_on_event AS participant ON event.id = participant.event_id
JOIN profile ON participant.profile_id = profile.id
WHERE EXISTS (
  SELECT *
  FROM event
  JOIN profile_on_event ON event.id = profile_on_event.event_id
  WHERE profile_on_event.profile_id = ${profileId}
  ) AND user_status <> 'declined'
GROUP BY event.id
ORDER BY date DESC
      `.execute(this.client);

      const parsedResult = result.rows.map((event: EventType) => {
        return {
          ...event,
          participants: typeof event.participants === "string" && JSON.parse(event.participants)
        }
      })
      return parsedResult
    } catch (error) {
      throw new DatabaseError(error)
    }
  }
  async getOrganizerEvents(profileId: number) {
    try {
      const result = await sql<any>`
SELECT 
  event.id AS event_id,
  event.date,
  event.duration,
  event.location,
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
  WHERE participant.profile_id = ${profileId} ) AS user_status,
  (SELECT COUNT (*) FROM profile_on_event WHERE event_id = event.id AND status_name = 'confirmed') AS confirmed_participants
FROM event
LEFT JOIN score ON event.id = score.event_id
JOIN profile_on_event AS participant ON event.id = participant.event_id
JOIN profile ON participant.profile_id = profile.id
WHERE EXISTS (
  SELECT *
  FROM event
  JOIN profile_on_event ON event.id = profile_on_event.event_id
  WHERE profile_on_event.profile_id = ${profileId}
  ) 
AND user_status <> 'declined'
AND event.organizer_id = ${profileId}
GROUP BY event.id
ORDER BY date DESC
      `.execute(this.client);

      const parsedResult = result.rows.map((event: EventType) => {
        return {
          ...event,
          participants: typeof event.participants === "string" && JSON.parse(event.participants)
        }
      })
      return parsedResult
    } catch (error) {
      throw new DatabaseError(error)
    }
  }
}
