import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AwardVoteDTO } from 'src/application/dto/award-vote.dto';
import { AwardUseCases } from 'src/application/usecases/award/award.usecases';

@Controller('mvp')
export class MvpAwardController {
  constructor(private readonly awardUsecases: AwardUseCases) {}
  @Post()
  @HttpCode(201)
  async createOne(@Body() body: AwardVoteDTO) {
    return this.awardUsecases.voteForMvp(
      body.event_id,
      body.profile_id,
      body.rater_id,
    );
  }
}
