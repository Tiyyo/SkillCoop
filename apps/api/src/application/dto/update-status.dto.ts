import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateParticipantStatusDTO {
  @IsNumber()
  @IsNotEmpty()
  event_id: number;
  @IsString()
  @IsNotEmpty()
  profile_id: string;
  @IsString()
  @IsNotEmpty()
  status_name: string;
}
