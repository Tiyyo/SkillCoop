import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateEventOrganizerDTO {
  @IsNumber()
  @IsInt()
  @IsNotEmpty()
  event_id: number;
  @IsNotEmpty()
  @IsString()
  organizer_id: string;
  @IsNotEmpty()
  @IsString()
  new_organizer_id: string;
}
