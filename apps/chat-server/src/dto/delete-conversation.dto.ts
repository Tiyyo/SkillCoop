import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class DeleteConversationParamsDto {
  @Type(() => Number)
  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  conversation_id: number;

  @IsNotEmpty()
  @IsString()
  user_id: string;
}