import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class PayloadMessageDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  conversation_id: number;
  @IsNotEmpty()
  @IsString()
  user_id: string;
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