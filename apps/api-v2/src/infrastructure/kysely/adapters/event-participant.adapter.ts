import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Kysely, ReferenceExpression, sql } from 'kysely';
import { CoreAdapter } from 'src/infrastructure/kysely/adapters/core.adapter';
import { DB } from 'src/infrastructure/kysely/database.type';
import {
  addCreatedISOStringDate,
  addUpdatedISOStringDate,
} from 'src/infrastructure/utils/add-date-object';
import { DatabaseException } from 'src/infrastructure/kysely/database.exception';
import { EventParticipantRepository } from 'src/domain/repositories/event-participant.repository';
import {
  EventParticipantEntity,
  TInvitationStatus,
} from 'src/domain/entities/event-participant.entity';

@Injectable()
export class EventParticipantAdapter
  extends CoreAdapter<'profile_on_event'>
  implements EventParticipantRepository {
  constructor(@Inject('dbClient') protected dbClient: Kysely<DB>) {
    super(dbClient);
    this.tableName = 'profile_on_event';
  }
  async updateStatusWithExistenceCheck({
    event_id,
    profile_id,
    status_name,
  }: {
    event_id: number;
    profile_id: string;
    status_name: 'confirmed' | 'declined' | 'pending' | 'requested' | 'refused';
  }) {
    const data = { event_id, profile_id, status_name };
    const dataWithUpdatedAt = addUpdatedISOStringDate(data);
    try {
      const participantExistence = await this.client
        .selectFrom('profile_on_event')
        .selectAll()
        .where('event_id', '=', event_id)
        .where('profile_id', '=', profile_id)
        .executeTakeFirst();

      const isExist = !!participantExistence;

      if (!isExist)
        throw new NotFoundException('User have not been invited yet');

      const result = await this.client
        .updateTable('profile_on_event')
        .set(dataWithUpdatedAt)
        .where('event_id', '=', event_id)
        .where('profile_id', '=', profile_id)
        .executeTakeFirst();

      return !!result.numChangedRows;
    } catch (error) {
      if (error instanceof Error) {
        throw new DatabaseException(error);
      }
    }
  }
  async find(data: Partial<EventParticipantEntity>) {
    const keys = Object.keys(data) as unknown as ReferenceExpression<
      DB,
      'profile_on_event'
    >[];
    const values = Object.values(data);
    try {
      let promise = this.client
        .selectFrom('profile_on_event')
        .select(['event_id', 'profile_id', 'status_name', 'team']);

      keys.forEach((key, index) => {
        promise = promise.where(key, '=', values[index]);
      });

      const result = await promise.execute();
      if (!result || result.length === 0)
        throw new NotFoundException('Not found');
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new DatabaseException(error);
      }
    }
  }
  async upsert(data: Partial<EventParticipantEntity>) {
    const dataWithCreatedAt = addCreatedISOStringDate(data);
    try {
      const result = await this.client
        .insertInto('profile_on_event')
        .values(dataWithCreatedAt)
        .onConflict((oc) =>
          oc.columns(['event_id', 'profile_id']).doUpdateSet({
            status_name:
              dataWithCreatedAt.status_name as unknown as TInvitationStatus,
            updated_at: dataWithCreatedAt.created_at,
          }),
        )
        .executeTakeFirst();

      return !!Number(result.numInsertedOrUpdatedRows);
    } catch (error) {
      if (error instanceof Error) {
        throw new DatabaseException(error);
      }
    }
  }
  async getAttendedEventCount(profileId: string) {
    try {
      const nbAttendedEvents = await this.client
        .selectFrom('profile_on_event')
        .select(({ fn }) => [
          fn
            .count<number>('profile_on_event.event_id')
            .as('nb_attended_events'),
        ])
        .innerJoin('event', 'event.id', 'profile_on_event.event_id')
        .where('profile_on_event.profile_id', '=', profileId)
        .where('event.status_name', '=', 'completed')
        .executeTakeFirst();

      return nbAttendedEvents;
    } catch (error) {
      if (error instanceof Error) {
        throw new DatabaseException(error);
      }
    }
  }
  async getWinningRate(profileId: string) {
    try {
      const winningRate = await sql<{ winning_rate: number }>`
          SELECT      
            (SUM(CASE 
                WHEN (team = 1 AND score_team_1 > score_team_2) OR 
                     (team = 2 AND score_team_2 > score_team_1) 
                THEN 1 ELSE 0 
                END) * 1.0 / COUNT(event.id)) * 100  AS winning_rate
          FROM profile_on_event
          INNER JOIN event ON profile_on_event.event_id = event.id
          INNER JOIN score ON event.id = score.event_id
          WHERE profile_on_event.profile_id = ${profileId}
          AND profile_on_event.status_name = 'confirmed'`.execute(this.client);

      return winningRate.rows[0];
    } catch (error) {
      if (error instanceof Error) {
        throw new DatabaseException(error);
      }
    }
  }
  async getEventTeamConfig(eventId: number) {
    try {
      const result = await this.dbClient
        .selectFrom(['profile_on_event'])
        .select(['profile_on_event.event_id'])
        .select(({ fn }) => [
          'profile_on_event.event_id',
          fn
            .agg<string>('group_concat', ['profile_on_event.profile_id'])
            .as('ids_participants'),
        ])
        .leftJoin('event', 'profile_on_event.event_id', 'event.id')
        .select(['event.required_participants', 'event.nb_teams'])
        .where('profile_on_event.event_id', '=', eventId)
        .where('profile_on_event.status_name', '=', 'confirmed')
        .groupBy(['profile_on_event.event_id', 'event.required_participants'])
        .executeTakeFirst();

      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new DatabaseException(error);
      }
    }
  }
}
