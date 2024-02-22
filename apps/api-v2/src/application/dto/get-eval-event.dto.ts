import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class GetEvalByEventDTO {
  @Type(() => Number)
  @IsNotEmpty()
  @IsNumber()
  event_id: number;
  @IsNotEmpty()
  @IsString()
  reviewee_id: string;
  @IsNotEmpty()
  @IsString()
  rater_id: string;
}
