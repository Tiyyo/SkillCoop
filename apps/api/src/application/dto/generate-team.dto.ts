import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';

export class GenerateTeamsDTO {
  @IsNumber()
  @IsNotEmpty()
  @IsInt()
  eventId: number;
}
