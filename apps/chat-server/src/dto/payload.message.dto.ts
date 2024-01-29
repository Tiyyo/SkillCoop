import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class PayloadMessageDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  conversation_id: number;
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  user_id: number;
  @IsString()
  @IsNotEmpty()
  message: string
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsString()
  @IsOptional()
  avatar: string | null;
}