import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class DeleteEventDTO {
  @Type(() => Number)
  @IsNotEmpty()
  @IsNumber()
  eventId: number;
  @IsNotEmpty()
  @IsString()
  profileId: string;
}
