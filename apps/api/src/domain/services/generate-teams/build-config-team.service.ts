import { Injectable } from '@nestjs/common';
import { ApplicationException } from 'src/application/exceptions/application.exception';
import { EventParticipantAdapter } from 'src/infrastructure/kysely/adapters/event-participant.adapter';
import { TeamEvaluationComputeService } from './team-evaluation.service';

@Injectable()
export class BuildConfigTeamService {
  constructor(
    private readonly eventParticipantAdapter: EventParticipantAdapter,
    private readonly teamEvaluationComputeService: TeamEvaluationComputeService,
  ) {}
  async getConfig(eventId: number) {
    const eventData = await this.fetchData(eventId);
    const ids = await this.extractIds(eventData);

    if (ids.length !== eventData.required_participants)
      throw new ApplicationException(
        'Wrong participant number',
        'TeamConfigGenerator',
      );
    const { values } = await this.teamEvaluationComputeService.compute(ids);
    return {
      team1: [],
      team2: [],
      nb_teams: eventData.nb_teams,
      ids: ids,
      values: values,
      participants: ids.length,
    };
  }
  private async fetchData(eventId: number) {
    return await this.eventParticipantAdapter.getEventTeamConfig(eventId);
  }
  private async extractIds(eventData: {
    event_id: number;
    ids_participants: string;
    required_participants: number;
    nb_teams: number;
  }) {
    const ids = eventData.ids_participants.split(',').map(String);
    return ids;
  }
}
