import { IsNotEmpty, IsNumber } from 'class-validator';

export class SaveScoreEventDTO {
  @IsNumber()
  @IsNotEmpty()
  score_team_1: number;
  @IsNumber()
  @IsNotEmpty()
  score_team_2: number;
  @IsNumber()
  @IsNotEmpty()
  event_id: number;
}
