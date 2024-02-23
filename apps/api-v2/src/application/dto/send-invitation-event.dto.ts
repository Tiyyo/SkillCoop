import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SendInvitationEventDTO {
  @IsNumber()
  @IsNotEmpty()
  event_id: number;
  @IsString()
  @IsNotEmpty()
  initiator: string;
  @IsArray()
  @IsNumber({}, { each: true })
  @IsNotEmpty()
  ids: string[];
}
