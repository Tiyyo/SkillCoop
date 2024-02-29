import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SendRequestEventDTO {
  @IsNumber()
  @IsNotEmpty()
  event_id: number;
  @IsString()
  @IsNotEmpty()
  profile_id: string;
}
