import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export class JoinRoomDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  conversation_id: number;
}