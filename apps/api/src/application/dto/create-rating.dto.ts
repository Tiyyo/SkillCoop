import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateRatingDTO {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(100)
  pace: number;
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(100)
  shooting: number;
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(100)
  passing: number;
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(100)
  dribbling: number;
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(100)
  defending: number;
  @IsString()
  @IsNotEmpty()
  rater_id: string;
  @IsString()
  @IsNotEmpty()
  reviewee_id: string;
  @IsNumber()
  @IsNotEmpty()
  event_id: number;
}
