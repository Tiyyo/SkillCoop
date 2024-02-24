import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class DeleteEventDTO {
  @IsNotEmpty()
  @IsNumber()
  eventId: number;
  @IsNotEmpty()
  @IsString()
  profileId: string;
}
