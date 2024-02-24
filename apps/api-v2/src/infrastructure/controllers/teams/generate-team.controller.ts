import { Body, Controller, Post } from '@nestjs/common';
import { GenerateTeamsDTO } from 'src/application/dto/generate-team.dto';
import { TeamsUsecases } from 'src/application/usecases/teams/teams.usecases';

@Controller('event')
export class GenerateTeamController {
  constructor(private readonly teamsUsecases: TeamsUsecases) { }

  @Post('teams')
  async generateTeams(@Body() body: GenerateTeamsDTO) {
    return await this.teamsUsecases.generate(body.eventId);
  }
}
