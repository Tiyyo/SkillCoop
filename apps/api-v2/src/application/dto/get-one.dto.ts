import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GetOneEventDTO {
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  eventId: number;
  @IsNotEmpty()
  @IsString()
  profileId: string;
}
