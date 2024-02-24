import { Injectable } from '@nestjs/common';
import { BuildConfigTeamService } from './build-config-team.service';
import { ApplicationException } from 'src/application/exceptions/application.exception';
import { assignTeam, divideInTeam } from './algo';
import { Player } from './type';
import { EventParticipantAdapter } from 'src/infrastructure/kysely/adapters/event-participant.adapter';

@Injectable()
export class GenerateTeamService {
  constructor(
    private readonly buildConfigService: BuildConfigTeamService,
    private readonly eventParticipantAdapter: EventParticipantAdapter,
  ) { }
  async generate(eventId: number) {
    const config = await this.buildConfigService.getConfig(eventId);
    if (!config) {
      throw new ApplicationException(
        'No provided config',
        'GenerateTeamService',
      );
    }
    const { team1, team2 } = divideInTeam(config);
    await this.saveTeams(team1, team2, eventId);
    // notify all payers
  }
  private async saveTeams(team1: Player[], team2: Player[], eventId: number) {
    const participants = team1.concat(team2);

    const updateParticipantQueries = participants.map((p, index) =>
      this.eventParticipantAdapter.updateOne(
        { profile_id: p.profile_id, event_id: eventId },
        { team: assignTeam(index, participants.length) },
      ),
    );
    await Promise.allSettled(updateParticipantQueries);
  }
}
