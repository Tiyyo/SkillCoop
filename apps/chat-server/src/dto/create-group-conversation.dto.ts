import { IsNotEmpty, IsNumber, IsOptional, IsPositive, ArrayNotEmpty, IsArray, IsString } from "class-validator";

export class CreateGroupConversationDto {
  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  creator_id: string;
  @IsOptional()
  @IsString()
  title?: string;
  @ArrayNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  participants_ids: string[];
}
