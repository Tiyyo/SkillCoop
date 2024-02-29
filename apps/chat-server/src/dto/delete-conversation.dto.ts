import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export class DeleteConversationParamsDto {
  @Type(() => Number)
  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  conversation_id: number;

  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  user_id: string;
}