import { Injectable } from '@nestjs/common';
import { GenerateTeamService } from 'src/domain/services/generate-teams/generate-team.service';

@Injectable()
export class TeamsUsecases {
  constructor(private readonly generateTeamService: GenerateTeamService) {}
  public async generate(eventid: number) {
    return await this.generateTeamService.generate(eventid);
  }
}
