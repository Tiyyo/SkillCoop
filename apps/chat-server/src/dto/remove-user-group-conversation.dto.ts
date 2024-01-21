import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export class RemoveUserGroupConversationDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  conversation_id: number;
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  participant_id: number;
}