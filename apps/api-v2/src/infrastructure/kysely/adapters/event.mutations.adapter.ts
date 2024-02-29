import { Inject, Injectable } from '@nestjs/common';
import { Kysely, sql } from 'kysely';
import { CoreAdapter } from 'src/infrastructure/kysely/adapters/core.adapter';
import { DatabaseException } from 'src/infrastructure/kysely/database.exception';
import { DB } from 'src/infrastructure/kysely/database.type';
import { addCreatedISOStringDate } from 'src/infrastructure/utils/add-date-object';
import { transformBoolToNumberInObject } from 'src/infrastructure/utils/bool-to-int';
import { getFormattedUTCTimestamp } from '@skillcoop/date-handler';
import { EventMutationsRepository } from 'src/domain/repositories/event.mutations.repository';
import { EventCoreEntity } from 'src/domain/entities/event.entity';

@Injectable()
export class EventMutationsAdapter
  extends CoreAdapter<'event'>
  implements EventMutationsRepository
{
  constructor(@Inject('dbClient') protected dbClient: Kysely<DB>) {
    super(dbClient);
    this.tableName = 'event';
  }
  async create(data: Partial<EventCoreEntity>) {
    const dataWithBool = transformBoolToNumberInObject(data);
    const dataWitCreatedAt = addCreatedISOStringDate(dataWithBool);
    try {
      const result = await this.client
        .insertInto('event')
        .values(dataWitCreatedAt)
        .returning('id')
        .executeTakeFirst();

      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new DatabaseException(error);
      }
    }
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
        throw new DatabaseException(error);
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
        throw new DatabaseException(error);
      }
    }
  }
}
