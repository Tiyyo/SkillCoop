import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AwardVoteDTO {
  @IsString()
  @IsNotEmpty()
  profile_id: string;
  @IsString()
  @IsNotEmpty()
  rater_id: string;
  @IsNumber()
  @IsInt()
  @IsNotEmpty()
  event_id: number;
}
